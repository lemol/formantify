import React from 'react'

class Field extends React.Component {

    render() {
        var title = undefined
        if(this.props.title)
            title = <label>{this.props.title}</label>

        return (
          <div className="field">
            {title}
            {this.props.children}
          </div>
        )
    }
}

class Fields extends React.Component {

    getNumber() {
        return this.props.count || 0
    }

    render() {

        const numbers = ["", "one", "two", "three", "four", "five"]
        const number = numbers[this.getNumber()]

        var title = undefined
        if(this.props.title)
            title = <label>{this.props.title}</label>

        return (
          <div className={`${number} fields`}>
            {title}
            {this.props.children}
          </div>
        )
    }
}

class TwoFields extends Fields {
    getNumber() { return 2 }
}

class ThreeFields extends Fields {
    getNumber() { return 3 }
}

export default {
  Fields: Fields, Field: Field, TwoFields: TwoFields, ThreeFields: ThreeFields
}

