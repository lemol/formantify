import 'semantic-ui/dist/components/input.css'
import 'semantic-ui/dist/components/icon.css'
import 'semantic-ui/dist/components/button.css'
import 'semantic-ui/dist/components/label.css'
import 'semantic-ui/dist/components/grid.css'
import 'semantic-ui/dist/components/form.css'

import React from 'react'
import SemanticComponent from './SemanticComponent'

//@reactMixin.decorate(Mixin)
export default class SemanticInput extends SemanticComponent {
  constructor(props) {
    super(props)
  }

  getType() {
    return 'input'
  }

  element() {
    const result = (
      <input
        type="text"
        name={this.props.name}
        onChange={this.handleChangeValue.bind(this)}
        value={this.getValue()}
        placeholder={(this.state.schema && this.state.schema.placeholder)||this.props.placeholder}
      />
    )

    return result
  }
}

