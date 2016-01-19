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

  render() {
    const value = this.getValue()

    if(value==undefined)
      return <div/>

    //alert(value.length)

    const res = value.map((c, i) => {
      const cl = this.props.children.props.children
      const clItem = this.props.children

      //const item = _.clone(clItem)
      const item = React.createElement(clItem.type, {
        index: i,
        key: i,
        name: this.props.name,
        formsied: this.context.formsied,
        changeValue: ::this.changeValue,
        getValue: ::this.getValue
      }, cl)

      return item
    })

    return <div>{res}</div>
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
    const name = `${this.props.name}[${this.props.index}].${component.props.name}`
    return name
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

