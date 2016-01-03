import React from 'react'

export class Field extends React.Component {

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

export class Fields extends React.Component {

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

export class TwoFields extends Fields {
    getNumber() { return 2 }
}

export class ThreeFields extends Fields {
    getNumber() { return 3 }
}

