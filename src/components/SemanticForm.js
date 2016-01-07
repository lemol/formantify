import React from 'react'
import { Form } from 'formsy-react'

class SemanticForm extends Form {

    constructor(props) {
        super(props)
        this.attachToForm = this.attachToForm1.bind(this)
    }

    getValueFor(model, str) {
        if(!model)
            return undefined

        var splDot = str.split('.')
        if(splDot.length>1) {
            return model[splDot[0]][splDot[1]]
        }

        var spl = str.split('[')
        if (spl.length==1) {
            return model[str]
        }
        else {
            var ix = spl[1].split(']')[0]
            return model[spl[0]][ix]
        }
    }

    attachToForm1(component) {

        var name = component.props.name
        var schema = this.props.schema[name]
        var value = component.props.initialValue || this.getValueFor(this.props.model, name)

        if (schema) {
            if (schema.placeholder === undefined)
                schema.placeholder = schema.displayName

            component.setSchema(schema, value)
        }
        component.setValue(value)
        component._componentWillMount && component._componentWillMount(schema)

        super.attachToForm(component)
    }

    render() {
        return (
          <div className="ui form">
            {super.render()}
          </div>
        )
    }
}

export default SemanticForm
