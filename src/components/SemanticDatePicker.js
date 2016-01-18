import 'semantic-ui/dist/semantic.css'
import 'semantic-ui-daterangepicker/daterangepicker.css'

import React from 'react'
import SemanticInput from './SemanticInput'
import SemanticComponent from './SemanticComponent'
import { Componenty } from 'formsy-react'

import $ from 'jquery'
import moment from 'moment'
import $factory from 'semantic-ui-daterangepicker'

$factory(this, {}, moment, $)

class SemanticDatePicker extends SemanticComponent {

  static defaultProps = {
    ...SemanticInput.defaultProps,
    rightIcon: 'calendar'
  }

  constructor(props) {
    super(props)
  }

  handleChangeValue(event) {
    const value = moment(event.currentTarget.value, 'DD/MM/YYYY')
    this.changeValue(value.toDate())
  }

  componentDidMount() {
    $(this.refs.value).daterangepicker({
      singleDatePicker: true,
      format: 'DD/MM/YYYY'
    })

    $(this.refs.value)
      .on('apply.daterangepicker', this.handleChangeValue.bind(this))
  }

  getType() {
    return 'input'
  }

  element() {
    const value = this.getValue() == undefined
      ? ''
      : moment(this.getValue()).format('DD/MM/YYYY')

    const result = (
      <input
        ref="value"
        type='text'
        name={this.props.name}
        onChange={this.handleChangeValue.bind(this)}
        value={value}
        placeholder={this.state.schema.placeholder}
      />
    )

    return result
  }
}

export default Componenty(SemanticDatePicker)
