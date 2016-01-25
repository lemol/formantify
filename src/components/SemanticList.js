import React from 'react'
import reactMixin from 'react-mixin'
import { Componenty } from 'formsy-react'
import Component from './SemanticComponent'

import { getValueFor, setValueFor } from '../utils/Expressions.js'

import _ from 'underscore'

class List1 extends Component {

  static displayName = 'List'

  static context = {
    formsied: React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  addNew() {
    const value = this.getValue()
    value.push({__is__new: true})
    this.changeValue(value)
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state._value !== nextState._value) {
      alert('update')
    }
  }

  render() {
    const value = this.getValue()

    if(value==undefined)
      return <div/>

    const res = value.map((c, i) => {
      const cl = this.props.children.props.children
      const clItem = this.props.children

      const item = React.createElement(clItem.type, {
        index: i,
        key: i,
        name: this.props.name,
        formsied: this.context.formsied,
        changeValue: ::this.changeValue,
        getValue: ::this.getValue,
        value: value,
        defaultValue: clItem.props.defaultValue
      }, cl)

      return item
    })

    const add = (
      <div style={{marginTop: '7px', paddingTop: '2px', borderTop: '1px solid rgba(0,0,0,0.06)'}}>
        <a href="javascript:void(0)" onClick={::this.addNew}>
          <i className="add circle icon"></i> Adicionar
        </a>
      </div>
    )

    return (
      <div>
        {res}
        {add}
      </div>
    )
  }
}

export const List = Componenty(List1)

export class Item extends React.Component {

  static childContextTypes = {
    formList: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.canUpdate = false
    this.items = []
  }

  componentDidMount() {

    const isNew = this.props.value[this.props.index].__is__new
    const value = this.props.value

    if(isNew) {
      value[this.props.index] = _.clone(this.props.defaultValue)
      this.props.changeValue(value, true)
      this.props.formsied.model[this.props.name] = value
    }

    for(const i in this.items) {
      this.items[i].setInitialEnv(this.props.formsied.model)
    }

    this.canUpdate = true
  }

  getChildContext() {
    return {
      formList: {
        getName: ::this.getName,
        setup: ::this.setup,
        changing: ::this.changing
      }
    }
  }

  setup(component) {
    component.shouldNotUpdateModel = true
    this.items.push(component)
    this.props.formsied.setup(component)
  }

  changing(component, value) {
    if(!this.canUpdate)
      return

    const listValue = this.getValue()
    const newList = {}
    newList[this.props.name] = listValue

    const varname = component.getName()

    setValueFor(newList, varname, value)
    this.props.changeValue(newList[this.props.name])

    this.props.formsied.changing(component, value)
  }

  getValue() {
    return this.props.getValue()
  }

  setValue(value) {
    return this.props.setValue(value)
  }

  getName(component) {
    const name = `${this.props.name}[${this.props.index}]${component.props.name && ('.' + component.props.name)}`
    return name
  }

  removeItem() {

  }

  render() {

    const remove = (
      <a href="javascript:void(0)" onClick={::this.removeItem}>
        <i className="minus square icon"></i>
      </a>
    )

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

