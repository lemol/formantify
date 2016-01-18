import React from 'react'
import { Form } from 'formsy-react'

import { getValueFor } from '../utils/Expressions.js'

const Formsyie = Formsyied => class extends React.Component {

  static childContextTypes = {
    formsied: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.canUpdate = false
    this.listeners = {}
    this.inputs = []
  }

  getChildContext() {
    return {
      formsied: {
        setup: ::this.setup,
        changing: ::this.changing
      }
    }
  }

  componentDidMount() {
    for(const i in this.inputs) {
      this.inputs[i].setInitialEnv(this.props.model)
    }
    this.canUpdate = true
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

  changing(component, value) {

    if(!this.canUpdate)
      return

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

  setup(component) {

    const name = component.props.name
    //alert(name)
    //alert(JSON.stringify(this.props.schema))
    const schema = this.props.schema[name] || {listOptions: {}}
    const value = component.props.initialValue || getValueFor(this.props.model, name)

    //alert(name)
    if (schema) {
      if (schema.placeholder === undefined)
        schema.placeholder = schema.displayName

      component.setSchema(schema, value)
    }

    this.inputs.push(component)
    component.setValue(value)
    component.setPristine(value)
    const env = component.getEnv(schema)
    this.saveEnv(component, env)
  }

  render() {
    return (
      <div className="ui form">
        <Formsyied {...this.props} _state={this.state} />
      </div>
    )
  }

}

export default Formsyie(Form)

