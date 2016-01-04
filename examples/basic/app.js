import React from 'react'
import { render } from 'react-dom'
import { Form, Input, Dropdown, Field, Fields, TwoFields } from 'formantify-react'

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
      },
      many: {
        displayName: 'Many',
        listOptions: {
          fields: {
            value: 'value',
            text: 'text'
          },
          list: [
            {
              value: 0, text: 'Leza'
            },
            {
              value: 1, text: 'Morais'
            },
            {
              value: 2, text: 'Lutonda'
            },
            {
              value: 3, text: 'Lemol'
            }
          ]
        }

      }
    }

    let model = {
      simple: "lemol",
      complex: '',
      many: 1
    }

    return (
      <Form schema={schema} model={model} onSubmit={this.submit.bind(this)}>
        <Field title="Carros">
          <TwoFields>
            <Input name="simple" rightButton={{icon: "home", className:"teal"}} leftIcon="download" />
            <Input name="complex" leftIcon="world" rightButton={{icon: "home"}} />
          </TwoFields>
        </Field>
        <Dropdown name="many" />
        <button type="submit">OK</button>
      </Form>
    )
  }
}

render(<Basic />, document.getElementById('root'))
