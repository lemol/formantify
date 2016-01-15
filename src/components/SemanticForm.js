import React from 'react'
import { Form } from 'formsy-react'

import { getValueFor } from '../utils/Expressions.js'

class SemanticForm extends Form {

  constructor(props) {
    super(props)
    this.canUpdate = false
    this.listeners = {}
  }

  componentDidMount() {
    for(const i in this.inputs) {
      this.inputs[i].setInitialEnv(this.props.model)
    }

    super.componentDidMount()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.canUpdate) {
      const res =
        super.shouldComponentUpdate ?
        super.shouldComponentUpdate (nextProps, nextState) :
        true

      return res
    }
    else {
      this.canUpdate = true
      return false
    }
  }

  validate(component) {
    super.validate(component)

    if(!this.canUpdate)
      return

    const value = component.getValue()

    const varname = component.props.name
    this.bindFor(varname, value)
  }

  saveEnv(component, env) {
    for(const i in env) {
      const varName = env[i]
      this.listeners[varName] = this.listeners[varName] || []
      this.listeners[varName].push(component)
    }
  }

  bindFor(varName, value) {
    for(const i in this.listeners[varName]) {
      const component = this.listeners[varName][i]
      component.updateVar(varName, value)
    }
  }

  attachToForm(component) {

    const name = component.props.name
    const schema = this.props.schema[name]
    const value = component.props.initialValue || getValueFor(this.props.model, name)

    if (schema) {
      if (schema.placeholder === undefined)
        schema.placeholder = schema.displayName

      component.setSchema(schema)
    }

    component.setValue(value)
    component._componentWillMount && component._componentWillMount(schema)
    const env = component.getEnv(schema)
    this.saveEnv(component, env)

    super.attachToForm(component)
  }

  render() {
    return (
      <div className="ui form">
        {super.render()}
      </div>
    )
  }
}

export default SemanticForm
