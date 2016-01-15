//import 'semantic-ui/dist/components/transition.css'
//import 'semantic-ui/dist/components/dropdown.css'
//import 'semantic-ui/dist/components/icon.css'
//import 'semantic-ui/dist/components/button.css'
//import 'semantic-ui/dist/components/label.css'
//import 'semantic-ui/dist/components/grid.css'
//import 'semantic-ui/dist/components/form.css'
import 'semantic-ui/dist/semantic.css'

import React from 'react'
import SemanticComponent from './SemanticComponent'

import { evalExpr, getEnv, updateEnv } from '../utils/Expressions.js'

import $ from 'jquery'
import $dropdown from 'semantic-ui-dropdown'
import $transition from 'semantic-ui-transition'

$.fn.dropdown = $dropdown
$.fn.transition = $transition

export default class SemanticDropdown extends SemanticComponent {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      status: ' ',
      env: {}
    }
  }

  setSchema(schema) {
    super.setSchema(schema)
  }

  setInitialEnv(env) {
    const schema = this.state.schema
    if (schema.listOptions.list) {
      this.setState({
        status: '',
        list: schema.listOptions.list,
        env: env
      })
    }
    if (schema.listOptions.url) {
      this.loadList(env, schema.listOptions)
    }
  }

  getEnv(schema) {
    const url = schema.listOptions.url

    if (url == undefined)
      return super.getEnv()

    return getEnv(url)
  }

  updateVar(varName, value) {
    const env = updateEnv(this.state.env, varName, value)

    //console.log(`Updating '${varName}' in '${this.props.name}' to '${value}'`)

    if (value === undefined || value === '') {
      this.setState({
        env: env,
        list: []
      })
    }
    else {
      this.setState({
        env: env,
        list: [],
        status: 'loading'
      })
      this.loadList(env, this.state.schema.listOptions)
    }

    this.setValue('')

  }

  shouldComponentUpdate(nextProps, nextState) {
    const res = (nextState.status !== this.state.status) || (nextState.list.length === 0)
    return res
  }

  componentWillUpdate(/*nextProps , nextState*/) {
    $(this.getElement()).dropdown('clear')
  }

  componentDidUpdate() {
    let value = this.getValue()
    $(this.getElement()).dropdown('refresh')

    if(this.state.list.length !== 0) {
      value = value == undefined ? '' : value
      $(this.getElement()).dropdown('set selected', value.toString())
      $(this.getElement()).dropdown('refresh')
    }
  }

  loadList(env, listOptions) {
    if (listOptions.url) {
      const url = evalExpr(env, listOptions.url)

      if(url === undefined) {
        return
      }

      this.setState({
        status: 'loading',
        env: env
      })

      $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success: ((res) => {
          this.setState({
            list: res,
            status: ''
          })
        }).bind(this)
      })
    }
  }

  changeValue(value) {
    if(value==='')
      return

    //console.log(`Setting '${value}' for '${this.props.name}'`)

    this.setValue(value)
    this.onChangeValue(value)
  }

  onChangeValue(value) {
    this.props.onChange && this.props.onChange(this.getValue())
    this.props.bind && this.props.bind(value)
  }

  componentDidMount() {
    const settings = {
      onChange: this.changeValue.bind(this),
      placeholder: this.state.schema.placeholder
    }

    $(this.getElement()).dropdown(settings)
  }

  getType() {
    return 'dropdown'
  }

  elementClassName() {
    const after = `${this.props.search?'search':''} ${this.state.status} selection`
    return super.elementClassName('', after)
  }

  element() {
    const fields = this.state.schema.listOptions.fields || {}
    fields.icon = fields.icon || 'icon'
    fields.text = fields.text || 'text'
    fields.value = fields.value || 'value'

    const items = this.state.list.map(x =>
      <div key={x[fields.value]} className="item" data-value={x[fields.value]}>
        {this.props.icon?(<i className={`${x[fields.icon]} ${this.props.icon}`}></i>):undefined}
        {x[fields.text]}
      </div>
    )

    let search = undefined
    if (this.props.search) {
      search = <input tabIndex="0" className="search" type="text" />
    }

    return [
      <input key={0} ref="value" name={this.props.name} value={this.getValue()} type="hidden" />,
      <i key={1} className="dropdown icon"></i>,
      search,
      <div key={2} className="default text">{this.state.schema.placeholder}</div>,
      <div key={3} tabIndex="-1" className="menu transition hidden">
        {items}
      </div>
    ]
  }

  elementProps() {
    return {
      tabIndex: '0'
    }
  }

}

