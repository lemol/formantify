import React from 'react'
import { render } from 'react-dom'
import { Form, Input, Dropdown, DatePicker, Field, Fields, TwoFields, ThreeFields, List, Item } from 'formantify-react'

class Basic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      manyId: 2
    }
  }

  submit(model) {
    alert(JSON.stringify(model))
  }

  render() {

    let schema = {
      simple: {
        displayName: 'Simples'
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

      },
      various: {
        displayName: 'Various',
        listOptions: {
          fields: {
            value: 'value',
            text: 'text'
          },
          url: '/various-{many}.json'
        }
      },
      others: {
        displayName: 'Others',
        listOptions: {
          fields: {
            value: 'value',
            text: 'text'
          },
          url: '/various-{various}.json'
        }
      },
      dia: {
        displayName: 'Dia'
      },
      options: {
        displayName: 'Options',
        items: {
          university: {
            displayName: 'University',
            listOptions: {
              url: '/universities.json'
            }
          },
          course: {
            displayName: 'Course',
            listOptions: {
              url: '/courses-{university}.json'
            }
          }
        }
      }
    }

    let model = {
      simple: 'lemol',
      complex: '',
      many: 2,
      various: 1,
      others: 3,
      dia: undefined,
      options: [
        { name: 'Lem', university: 1, course: 3 },
        { name: 'Lez', university: 1, course: 2 },
        { name: 'Lut', university: 2, course: 1 }
      ]
    }

    return (
      <Form schema={schema} model={model} onSubmit={this.submit.bind(this)}>
        <Field title="Carros">
          <TwoFields>
            <Input name="simple" rightButton={{ icon: 'home', className:'teal' }} leftIcon="download" />
            <Input name="complex" leftIcon="world" rightButton={{ icon: 'home' }} />
          </TwoFields>
        </Field>
        <ThreeFields>
          <Dropdown name="many" />
          <Dropdown name="various" />
          <Dropdown name="others" />
        </ThreeFields>
        <Fields>
          <DatePicker name="dia" />
        </Fields>
        {/*<List name="options">
          <Item>
            <Input name="name" />
            <Dropdown name="university" />
            <Dropdown name="course" />
          </Item>
          </List>*/}
        <button type="submit">OK</button>
      </Form>
    )
  }
}

render(<Basic />, document.getElementById('root'))
