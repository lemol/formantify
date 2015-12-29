import React from 'react'
import SemanticComponent from './SemanticComponent'

//@reactMixin.decorate(Mixin)
class SemanticInput extends SemanticComponent {
  constructor(props) {
    super(props)
  }

  getType() {
    return 'input'
  }

  element() {
    const result = (
      <input
        type='text'
        name={this.props.name}
        onChange={this.handleChangeValue.bind(this)}
        value={this.getValue()}
        placeholder={this.state.schema.placeholder}
      />
    )

    return result
  }

  render() {
    return super.render()
  }
}

export default SemanticInput
