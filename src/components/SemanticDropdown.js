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
      status: ''
    }
  }

  setSchema(schema, value) {
    super.setSchema(schema)
    if (schema.listOptions.list) {
      this.setState({
        list: schema.listOptions.list
      })
    }
    if (schema.listOptions.url) {
      this.loadList(this.props.env || {}, schema.listOptions, value)
    }
  }

  componentWillReceiveProps(nextProps) {
    const envChanged = nextProps.env !== this.props.env
    const listOptions = this.state.schema.listOptions

    if(envChanged) {
      if (listOptions.url) {
        this.changeValue(undefined)
        this.loadList(nextProps.env || {}, listOptions)
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const listChanged = nextState.list !== this.state.list
    const envChanged = nextProps.env !== this.props.env
    return listChanged || envChanged
  }

  componentWillUpdate (nextProps, nextState) {
    const listChanged = nextState.list !== this.state.list
    if (listChanged) {
      $(this.getElement()).dropdown('clear')
    }
  }

  componentDidUpdate() {
    const value = this.getValue()
    if(value != undefined) {
      $(this.getElement()).dropdown('refresh')
      $(this.getElement()).dropdown('set selected', value)
    }
  }

  evalExpr(env, expr) {
      var res = expr
      for(var name in env) {
          res = res.replace('{' + name + '}', env[name])
      }
      return res
  }

  loadList(env, listOptions, value) {

    if (listOptions.url) {
      const url = this.evalExpr(env, listOptions.url)

      this.setState({
        list: [],
        status: 'loading'
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

    var items = this.state.list.map(x =>
        <div key={x[fields.value]} className="item" data-value={x[fields.value]}>
          {this.props.icon?(<i className={`${x[fields.icon]} ${this.props.icon}`}></i>):undefined}
          {x[fields.text]}
        </div>
    )

    var search = undefined
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

