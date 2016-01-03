import React from 'react'
import { render } from 'react-dom'
import { Form, Input, Field, Fields, TwoFields } from 'formantify-react'

class Basic extends React.Component {
  constructor(props) {
    super(props)
  }

  submit(model) {
    alert(JSON.stringify(model))
  }

  render() {

    let schema = {
      simple: {
        displayName: "Simples"
      },
      complex: {
        displayName: 'Complex'
      }
    }

    let model = {
      simple: "lemol",
      complex: ''
    }

    return (
      <Form schema={schema} model={model} onSubmit={this.submit.bind(this)}>
        <Field title="Carros">
          <TwoFields>
            <Input name="simple" rightButton={{icon: "home", className:"teal"}} leftIcon="download" />
            <Input name="complex" leftIcon="world" rightButton={{icon: "home"}} />
          </TwoFields>
        </Field>
        <button type="submit">OK</button>
      </Form>
    )
  }
}

render(<Basic />, document.getElementById('root'))
