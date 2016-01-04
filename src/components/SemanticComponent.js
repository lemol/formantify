import React from 'react'
import reactMixin from 'react-mixin'
import { Mixin } from 'formsy-react'

class SemanticComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      schema: null
    }
  }

  handleChangeValue(event) {
    this.setValue(event.currentTarget.value)
    this.onChangeValue && this.onChangeValue(event.currentTarget.value)
  }

  setSchema(schema) {
    this.setState({
      schema: schema
    })
  }

  getType() {
    return this.props.type
  }

  fieldWidth() {
    return numberName(this.props.width || 0)
  }

  title() {
    var result = undefined

    if(this.state.schema == null)
      return result

    if(this.state.schema.displayName != null && !this.props.nolabel)
      result = <label htmlFor={this.props.name}>{this.state.schema.displayName}</label>

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
    return (<div className='validation-error'>{this.getErrorMessage()}</div>)
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
        type='text'
        name={this.props.name}
        onChange={this.changeValue.bind(this)}
        value={this.getValue()}
        placeholder={this.state.schema.placeholder}
      />
    )

    return result
  }

  getElement() {
    return this.refs.element
  }

  elementProps() {
    return {}
  }

  render() {
    if(this.state.schema == null)
      return (<div>Invalid Component</div>)

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

reactMixin.onClass(SemanticComponent, Mixin)

function numberName(i) {
  const numbers = ["", "one", "two", "three", "four", "five", "six",
          "seven", "eight", "nine", "ten", "eleven", "twelve", "threeteen", "fourteen", "fiveteen", "sixteen"]
  return numbers[i]
}

export default SemanticComponent
