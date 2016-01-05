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

    setSchema(schema) {
      super.setSchema(schema)
      if (schema.listOptions.list) {
        this.setState({
          list: schema.listOptions.list
        })
      }
      if (schema.listOptions.url) {
        this.loadList(this.props.env || {}, schema.listOptions)
      }
    }

    componentWillUpdate(props) {
      if(this.props.env !== props.env) {
        if (this.state.schema.listOptions.url) {
          this.changeValue(undefined)
          this.setState({list: [], status: ''})
          $(this.getElement()).dropdown('clear')
          this.loadList(props.env || {}, this.state.schema.listOptions)
        }
      }
    }

    componentDidUpdate() {
      //$(this.getElement()).dropdown('refresh')
      //$(this.getElement()).dropdown('clear')
      //$(this.getElement()).dropdown('refresh')
      //$(this.getElement()).dropdown('set selected', this.getValue())
      $(this.getElement()).dropdown('refresh')
    }

    evalExpr(env, expr) {
        var res = expr
        for(var name in env) {
            res = res.replace('{' + name + '}', env[name])
        }
        return res
    }

    loadList(env, listOptions) {

        //const listOptions = this.state.schema.listOptions || {}

        if (listOptions.url) {

            const url = this.evalExpr(env, listOptions.url)
            this.setState({
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

    //_componentWillMount(schema) {
      //alert(JSON.stringify(this.state))
      //if (schema.listOptions.url) {
        //this.loadList(this.props.env || {}, schema.listOptions)
      //}
    //}

    componentDidMount() {
      const settings = {
        onChange: this.changeValue.bind(this)
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

