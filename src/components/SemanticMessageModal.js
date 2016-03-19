import 'semantic-ui/dist/semantic.css'

import React from 'react'
import Modal from './SemanticModal'

import $ from 'jquery'
import $accordion from 'semantic-ui-accordion'
import $transition from 'semantic-ui-transition'
import $dimmer from 'semantic-ui-dimmer'
import $modal from 'semantic-ui-modal'

$.fn.accordion = $accordion
$.fn.transition = $transition
$.fn.dimmer = $dimmer
$.fn.modal = $modal

export default class MessageModal extends Modal {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.$modal = $(this.getElement())
      .modal('setting', {
        closable: false,
        onDeny: (() => {
          this.props.onNo && this.props.onNo(this.args)
          return true
        }).bind(this),
        onApprove: (() => {
          this.props.onYes && this.props.onYes(this.args)
          return true
        }).bind(this)
      })

    if(this.props.show)
      super.show(this.args)
  }

  body() {

    return [
      <div key="msg" className="image content">
        <div className="image">
          <i className="question icon"></i>
        </div>
        <div className="description">
          <p>{this.props.message}</p>
        </div>
      </div>,
      <div key="actions" className="actions">
        <div className="two fluid ui inverted buttons">
          <div className="ui negative red basic inverted button">
            <i className="remove icon"></i>
            Não
          </div>
          <div className="ui positive green basic inverted button">
            <i className="checkmark icon"></i>
            Sim
          </div>
        </div>
      </div>
    ]
  }
}
