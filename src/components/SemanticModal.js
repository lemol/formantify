import 'semantic-ui/dist/semantic.css'

import React from 'react'

import $ from 'jquery'
import $accordion from 'semantic-ui-accordion'
import $transition from 'semantic-ui-transition'
import $dimmer from 'semantic-ui-dimmer'
import $modal from 'semantic-ui-modal'

$.fn.accordion = $accordion
$.fn.transition = $transition
$.fn.dimmer = $dimmer
$.fn.modal = $modal

export default class Modal extends React.Component {

  static defaultProps = {
  }

  constructor(props) {
    super(props)
  }

  show(args) {
    this.args = args
    this.$modal.modal('show')
  }

  componentDidMount() {
    this.$modal = $(this.getElement())

    if(this.props.show)
      this.show()
  }

  getElement() {
    return this.refs.element
  }

  body() {
    return this.props.children
  }

  render() {

    return (
      <div ref="element" className="ui basic modal">
        <i className="close icon"></i>
        <div className="header">
          {this.props.title}
        </div>
        {this.body()}
      </div>
    )
  }
}

