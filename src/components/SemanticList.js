import React from 'react'
import reactMixin from 'react-mixin'
import { Mixin } from 'formsy-react'
//import { Form } from 'formsy-react'
import Component from './SemanticComponent'

import { getValueFor } from '../utils/Expressions.js'

import _ from 'underscore'

export class List extends Component {

  constructor(props) {
    super(props)
    this.canUpdate = false
    this.listeners = {}
  }

  //componentWillMount() {
    //const elms = this.props.children.props.children
    //for(const i in elms) {

    //}
  //}
  getChildContext() {
    return {
      formList: {
        addItem: ::this.addItem
      }
    }
  }

  addItem(index, item) {
    alert(item.props.name)

    if(item.props.name) {
      const name = `${this.props.name}[${index}].${item.props.name}`
      alert('Adding: ' + name)
      this.context.formsy.attachToForm(item, name)
    }
  }

  //setSchema(schema, value) {
    ////alert(schema.displayName)
    ////alert(value)
  //}

  render() {
    //alert(JSON.stringify(this.props.children[0]))
    //var c = this.props.children.props.children
    //alert(c)

    const res = []

    //this.getValue().map()
    for(var i in (this.getValue && this.getValue())||[]) {
      const cl = this.props.children.props.children
      const inst = _.extend(cl)
      res.push(inst)
      //alert(JSON.stringify(inst[0].props.idd))
    }

    return <div>{res}</div>
  }
}

List.
  childContextTypes = {
    formList: React.PropTypes.object
  }

export class Item extends React.Component {
  constructor(props) {
    super(props)
  }
}

