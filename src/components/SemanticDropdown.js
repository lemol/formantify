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

//@reactMixin.decorate(Mixin)
export default class SemanticDropdown extends SemanticComponent {

    constructor(props) {
        super(props)
        this.state = {
            listOptions: null,
            list: [],
            status: ''
        }

    }

    componentWillUpdate(props) {
        if(this.props.env !== props.env) {
            this.setValue(undefined)
            this.setState({list: []})
            $(this.refs.dropdown).dropdown('clear')
            this.loadList(props.env || {})
        }
    }

    componentDidUpdate() {
      $(this.getElement()).dropdown('refresh')
    }

    onChangeValue(value) {
      this.props.onChange && this.props.onChange(this.getValue())
    }

    evalExpr(env, expr) {
        var res = expr
        for(var name in env) {
            res = res.replace('{' + name + '}', env[name])
        }
        return res
    }

    loadList(env) {

        const listOptions = this.state.schema.listOptions || {}

        if (listOptions.url) {

            const url = this.evalExpr(env, listOptions.url)

            this.setState({
                status: 'loading'
            })

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: (res) => {

                    this.setState({
                        list: res,
                        status: ''
                    })

                    $(this.refs.dropdown).dropdown('set selected', this.getValue())
                }
            })
        }

    }

    componentDidMount() {
      const settings = {
        onChange: (value, text) => {
          this.setValue(value)
          if(this.props.onChange)
            this.props.onChange(value)
        }
      }

      $(this.getElement()).dropdown(settings)

      if (this.state.schema.listOptions.list.length > 0) {
        //$(this.getElement()).dropdown('set selected', this.getValue())
        //$(this.refs.dropdown).dropdown('set selected', this.getValue())
      }
      else {
        this.loadList(this.props.env || {})
      }
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

      var items = this.state.schema.listOptions.list.map(x =>
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
        <input ref="value" name={this.props.name} value={this.getValue()} type="hidden" />,
        <i className="dropdown icon"></i>,
        search,
        <div className="default text">{this.state.schema.placeholder}</div>,
        <div tabIndex="-1" className="menu transition hidden">
          {items}
        </div>
      ]
    }

    elementProps() {
      return {
        ref: 'dropdown',
        tabIndex: '0'
      }
    }

}

