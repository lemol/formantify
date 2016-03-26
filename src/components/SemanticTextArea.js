import 'semantic-ui/dist/components/input.css'
import 'semantic-ui/dist/components/icon.css'
import 'semantic-ui/dist/components/button.css'
import 'semantic-ui/dist/components/label.css'
import 'semantic-ui/dist/components/grid.css'
import 'semantic-ui/dist/components/form.css'

import React from 'react'
import SemanticComponent from './SemanticComponent'
import { Componenty } from 'formsy-react'

export default class SemanticTextArea extends SemanticComponent {
  constructor(props) {
    super(props)
  }

  getType() {
    return 'textarea'
  }

  element() {
    const result = (
      <textarea
        name={this.getName()}
        onChange={this.handleChangeValue.bind(this)}
        value={this.getValue()}
        placeholder={(this.state.schema && this.state.schema.placeholder)||this.props.placeholder}
      />
    )

    return result
  }
}

export default Componenty(SemanticTextArea)

