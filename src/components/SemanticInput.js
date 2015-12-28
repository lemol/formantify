import { Component } from 'react'

class SemanticInput extends SemanticComponent {
  constructor(props) {
    super(props)
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

  render() {
    super.render()
  }
}
