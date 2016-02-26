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
          name: {
            displayName: 'Name'
          },
          country: {
            displayName: 'Country',
            listOptions: {
              url: '/countries.json'
            }
          },
          university: {
            displayName: 'University',
            listOptions: {
              url: '/universities-{country}.json'
            }
          },
          course: {
            displayName: 'Course',
            listOptions: {
              url: '/courses-{university}.json'
            }
          }
        }
      },
      phones: {
        displayName: 'Phones',
        items: {
          '': {
            displayName: '#'
          }
        }
      },
      muito: {
        displayName: 'Muito',
        listOptions: {
          url: '/courses-1.json'
        }
      },
      father: {
        displayName: 'Pai'
      },
      son: {
        displayName: 'Filho'
      },
      mother: {
        displayName: 'Mae',
        listOptions: {
          url: '/courses-1.json'
        }
      },
      daughter: {
        displayName: 'Filha',
        listOptions: {
          url: '/courses-1.json'
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
        { name: 'Lem', country: 1, university: 1, course: 3 },
        { name: 'Lez', country: 2, university: 1, course: 2 },
        { name: 'Lut', country: 1, university: 2, course: 1 }
      ],
      phones: [
        '998616346',
        '923123456',
        '912834753',
        '917323499'
      ],
      muito: [1, 2],
      father: 'aa',
      son: 'ee',
      mother: 2,
      daughter: [1, 2]
    }

    const updm = function(n,v) {
      if(v=='1')
       return this.setValue([2, 3])
      if(v=='2')
       return this.setValue([0, 2])
      if(v=='3')
       return this.setValue([1, 3])
    }

    const updf = function(n,v) {
      this.props.setValue(v)
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
        <TwoFields>
          <DatePicker name="dia" />
          <Dropdown name="muito" fluid multiple search normal />
        </TwoFields>
        <TwoFields>
          <Input name="father" />
          <Input name="son" bind={{'father': updf}} />
        </TwoFields>
        <TwoFields>
          <Dropdown name="mother" />
          <Dropdown name="daughter" bind={{'mother': updm}} fluid multiple search normal />
        </TwoFields>
        <div className="ui segment">
          <List name="options">
            <Item defaultValue={{}}>
              <Fields>
                <Input name="name" />
                <Dropdown name="country" leftIcon="male" />
                <Dropdown name="university" />
                <Dropdown name="course" />
              </Fields>
            </Item>
          </List>
        </div>
        <div className="ui segment">
          <List name="phones">
            <Item defaultValue="">
              <Fields>
                <Input name="" />
              </Fields>
            </Item>
          </List>
        </div>
        <button type="submit">OK</button>
      </Form>
    )
  }
}

render(<Basic />, document.getElementById('root'))
