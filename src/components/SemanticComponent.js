import React from 'react'
import reactMixin from 'react-mixin'
import { Componenty, Mixin } from 'formsy-react'
//import { ListMixin } from './SemanticList'
//

export default class SemanticComponent extends React.Component {

  static contextTypes = {
    formsied: React.PropTypes.object,
    formList: React.PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      schema: null
    }
    this.envInitialized = false
  }

  componentWillMount() {
    if (this.context.formList) {
      return this.context.formList.setup(this)
    }

    if (this.context.formsied) {
      this.context.formsied.setup(this)
    }
  }

  componentDidUpdate(prevProps) {
    return this.props.componentDidUpdate(prevProps)
  }

  setInitialEnv(env) {
    console.log(`setting initial env for: ${this.getName()} -> ${JSON.stringify(env)}`)
    this.envInitialized = true
  }

  getEnv() {

    const envs = []

    if(this.props.bind) {
      for(const b in this.props.bind) {
        envs.push({name: b, fn: this.props.bind[b]})
      }
    }

    return envs
  }

  handleChangeValue(event) {
    this.changeValue(event.currentTarget.value)
  }

  changeValue(value, silent = false) {
    this.setValue(value)
    this.onChangeValue(value, silent)
  }

  changing(value) {
    if(this.context.formList) {
      return this.context.formList.changing(this, value)
    }
    this.context.formsied.changing(this, value)
  }

  onChangeValue(value, silent = false) {
    if (!silent)
      this.changing(value)

    typeof(this.props.onChange)==='function' && this.props.onChange(this.props.getValue())
    typeof(this.props.bind)==='function' && this.props.bind(value)
  }

  setSchema(schema) {
    this.setState({
      schema: schema
    })
  }

  getType() {
    return this.props.type
  }

  getName() {
    if(this.context.formList) {
      return this.context.formList.getName(this)
    }

    return this.props.name
  }

  getNameBase() {

    if(!this.context.formList) {
      return ''
    }

    const spl = this.getName().split('.')
    let namebase = ''

    for(var i=0; i<spl.length-1; i++) {
      namebase += spl[i]
    }

    namebase = namebase && (namebase + (this.props.name && '.'))
    return namebase
  }

  fieldWidth() {
    return numberName(this.props.width || 0)
  }

  title() {
    var result = undefined

    if(this.state.schema == null)
      return result

    if(this.state.schema.displayName != null && !this.props.nolabel)
      result = <label htmlFor={this.getName()}>{this.state.schema.displayName}</label>

    return result
  }

  icon(side) {
    var type = `${side}Icon`
    var result = undefined

    if(this.props[type])
      result = <i className={`${this.props[type]} icon`}></i>

    return result
  }

  label() {
    var result = undefined

    if(this.props.label)
      result = <div className="ui label">{this.props.label}</div>

    return result
  }

  button(side) {
    var type = `${side}Button`
    var options = this.props[type]
    var result = undefined

    if(!options)
      return undefined

    var icon = undefined
    if(options.icon)
        icon = <i className={`${options.icon} icon`}></i>

    const text = options.text || (typeof(options)==='string' ? options : '')

    result = (
      <button
        type="button"
        className={`ui ${options.className || ''} button`}
        onClick={options.onClick}
      >
        {icon}
        {text}
      </button>
    )

    return result
  }

  fieldClassName() {
    const width = this.fieldWidth()
    const className = (width!==""? (width + " wide ") : "") + "field"
    return className
  }

  elementClassName(before = '', after = '') {
    const leftButton  = this.props.leftButton ? 'left action' : ''
    const rightButton = this.props.rightButton ? 'right action' : ''
    const leftIcon = this.props.leftIcon ? 'left icon' : ''
    const rightIcon = this.props.rightIcon ? 'right icon' : ''
    const labelClass = this.props.label ? 'labeled' : ''

    const result = `ui ${before} ${leftButton} ${rightButton} ${leftIcon} ${rightIcon} ${labelClass} ${after} ${this.getType()}`

    return result
  }

  errorMessage() {
    return (<div className='validation-error'></div>)
    //return (<div className='validation-error'>{this.getErrorMessage()}</div>)
  }

  beforeElement() {
    return undefined
  }

  afterElement() {
    return undefined
  }

  element() {
    const result = (
      <input
        type="text"
        name={this.getName()}
        onChange={this.changeValue.bind(this)}
        value={this.props.getValue()}
        placeholder={(this.state.schema && this.state.schema.placeholder)||this.props.placeholder}
      />
    )

    return result
  }

  getElement() {
    return this.refs.element
  }

  setValue(value) {
    return this.props.setValue(value)
  }

  getValue(value) {
    return this.props.getValue()
  }

  setPristine(value) {
    this.props.setPristine(value)
  }

  elementProps() {
    return {}
  }

  render() {
    //if(this.state.schema == null)
      //return (<div>Invalid Component</div>)

    return (
      <div className={this.fieldClassName()}>
        {this.title()}
        <div ref="element" {...this.elementProps} className={this.elementClassName()}>
          {this.label()}
          {this.icon('left')}
          {this.button('left')}
          {this.beforeElement()}
          {this.element()}
          {this.afterElement()}
          {this.icon('right')}
          {this.button('right')}
        </div>
        {this.errorMessage()}
      </div>
    )
  }
}

export default SemanticComponent
//export default Componenty(SemanticComponent)

function numberName(i) {
  const numbers = ["", "one", "two", "three", "four", "five", "six",
          "seven", "eight", "nine", "ten", "eleven", "twelve", "threeteen", "fourteen", "fiveteen", "sixteen"]
  return numbers[i]
}
