import React from 'react'
import reactMixin from 'react-mixin'
import { Componenty, Mixin } from 'formsy-react'
//import { ListMixin } from './SemanticList'
//

//const ListMixin = {
  //contextTypes: {
    ////formList: React.PropTypes.object,
    //listItem: React.PropTypes.object
  //},

  //componentWillMount: function() {

    //if(this.context.listItem) {
      //this.getName = () => {
        //alert('getting name')

        //const index = 0
        //const collectionName = 'lemol'
        //const name = `${collectionName}[${index}].${item.props.name}`
        //return name
      //}
    //}

    ////alert('Mounting')
    ////alert(JSON.stringify(this.context))
    ////if(this.context.listItem) {
      ////alert('Formlist: ' + this.props.name)
      ////this.context.formList.addItem(0,this)
    ////}
  //}
//}

const ItemComponent = ListItem => class extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    return <ListItem {...this.props} {...this.state} />
  }
}

export default class SemanticComponent extends React.Component {

  constructor(props) {
    super(props)
    alert('S>>'+props.name)
    this.state = {
      ...props._state,
      schema: null,
      _modelValue: null,
      _initialEnv: null
    }
  }

  setInitialEnv() {
  }

  setModelValue(value) {
    this.setState({
      _modelValue: value
    })
    this.setValue(value)
  }

  getEnv() {
    return []
  }

  handleChangeValue(event) {
    this.changeValue(event.currentTarget.value)
  }

  changeValue(value) {
    this.setValue(value)
    this.onChangeValue(value)
  }

  onChangeValue(value) {
    this.props.onChange && this.props.onChange(this.props.getValue())
    this.props.bind && this.props.bind(value)
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
    return (this.getName1 && this.getName1()) || this.props.name
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
    return (<div className='validation-error'>this.getErrorMessage()</div>)
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

//reactMixin.onClass(SC, Mixin)
//reactMixin.onClass(SemanticComponent, ListMixin)

export default Componenty(SemanticComponent)

function numberName(i) {
  const numbers = ["", "one", "two", "three", "four", "five", "six",
          "seven", "eight", "nine", "ten", "eleven", "twelve", "threeteen", "fourteen", "fiveteen", "sixteen"]
  return numbers[i]
}
