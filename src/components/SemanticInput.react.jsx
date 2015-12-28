
class SemanticInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayName: null,
            placeholder: null
        }

    }

    setModelValue(value) {
        this.setValue(value)
    }

    changeValue(event) {
        this.setValue(event.currentTarget.value)
    }

    setSchema(schema) {
        this.setState(schema)
    }
    render() {

        const numbers = ["", "one", "two", "three", "four", "five", "six",
          "seven", "eight", "nine", "ten", "eleven", "twelve", "threeteen", "fourteen", "fiveteen", "sixteen"]
        var number = numbers[this.props.width || 0]

        var label = undefined
        if(this.state.displayName != null && !this.props.nolabel)
            label = <label htmlFor={this.props.name}>{this.state.displayName}</label>

        var leftIcon = undefined
        if(this.props.leftIcon)
            leftIcon = <i className={`${this.props.leftIcon} icon`}></i>

        var labeled = undefined
        if(this.props.labeled)
            labeled = <div className="ui label">{this.props.labeled}</div>

        var rightButton = undefined
        if(this.props.rightButton) {
            var rbp = this.props.rightButton

            var rbIcon = undefined
            if(rbp.icon)
                rbIcon = <i className={`${rbp.icon} icon`}></i>

            rightButton = (
              <button
                type="button"
                className={`ui ${rbp.className || ''} button`}
                onClick={rbp.onClick}
              >
                {rbIcon}
                {rbp.text}
              </button>
            )
        }

        const className = (number!==""? (number + " wide ") : "") + "field"

          // An error message is returned ONLY if the component is invalid
          // or the server has returned an error message
        const errorMessage = this.getErrorMessage();

        const elmClassName = `ui ${this.props.rightButton?'right action':''} ${this.props.labeled?'labeled':''} ${this.props.leftIcon?'left icon':''} input`

        return (
          <div className={className}>
            {label}
            <div className={elmClassName}>
              {leftIcon}
              {labeled}
              <input
                type='text'
                name={this.props.name}
                onChange={this.changeValue.bind(this)}
                value={this.getValue()}
                placeholder={this.state.placeholder}
              />
              {rightButton}
            </div>
            <span className='validation-error'>{errorMessage}</span>
          </div>
        )
    }
}

reactMixin.onClass(SemanticInput, Formsy.Mixin)

const Input = SemanticInput

class Field extends React.Component {

    render() {
        var label = undefined
        if(this.props.label)
            label = <label>{this.props.label}</label>

        return (
          <div className="field">
            {label}
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

        var label = undefined
        if(this.props.label)
            label = <label>{this.props.label}</label>

        return (
          <div className={`${number} fields`}>
            {label}
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


class SemanticDropdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayName: null,
            placeholder: null,
            listOptions: null,
            list: [],
            status: ''
        }

    }

    componentWillUpdate(props) {
        if(this.props.env !== props.env) {
            this.setValue(undefined)
            this.setState({list: []})
            $(this.refs.dropdown).dropdown('clear')
            this.loadList(props.env || {})
        }
    }

    componentDidUpdate() {
        $(this.refs.dropdown).dropdown('refresh')
    }

    setModelValue(value) {
        this.setValue(value)
        if(this.props.onChange)
            this.props.onChange(this.getValue())
    }

    changeValue(event) {
        this.setValue(event.currentTarget.value)
        if(this.props.onChange)
            this.props.onChange(this.getValue())
    }

    setSchema(schema) {
        this.setState(schema)
        if (schema.listOptions.list) {
            this.setState({
                list: schema.listOptions.list
            })
        }
    }

    evalExpr(env, expr) {
        var res = expr
        for(var name in env) {
            res = res.replace('{' + name + '}', env[name])
        }
        return res
    }

    loadList(env) {

        const listOptions = this.state.listOptions || {}

        if (listOptions.url) {

            const url = this.evalExpr(env, listOptions.url)

            this.setState({
                status: 'loading'
            })

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: (res) => {

                    this.setState({
                        list: res,
                        status: ''
                    })

                    $(this.refs.dropdown).dropdown('set selected', this.getValue())
                }
            })
        }

    }

    componentDidMount() {
        const settings = {
            onChange: (value, text) => {
                this.setValue(value)
                if(this.props.onChange)
                    this.props.onChange(value)
            }
        }

        $(this.refs.dropdown).dropdown(settings)

        if (this.state.list.length > 0) {
            $(this.refs.dropdown).dropdown('set selected', this.getValue())
        }
        else {
            this.loadList(this.props.env || {})
        }
    }

    render() {

        const numbers = ["", "one", "two", "three", "four", "five", "six",
          "seven", "eight", "nine", "ten", "eleven", "twelve", "threeteen", "fourteen", "fiveteen", "sixteen"]
        var number = numbers[this.props.width || 0]

        var label = undefined
        if(this.state.displayName != null && !this.props.nolabel)
            label = <label htmlFor={this.props.name}>{this.state.displayName}</label>

        const className = (number!==""? (number + " wide ") : "") + "field"

          // An error message is returned ONLY if the component is invalid
          // or the server has returned an error message
        const errorMessage = this.getErrorMessage();

        const fields = this.state.listOptions.fields || {}
        fields.icon = fields.icon || 'icon'
        fields.text = fields.text || 'text'
        fields.value = fields.value || 'value'

        var items = this.state.list.map(x =>
            <div key={x[fields.value]} className="item" data-value={x[fields.value]}>
              {this.props.icon?(<i className={`${x[fields.icon]} ${this.props.icon}`}></i>):undefined}
              {x[fields.text]}
            </div>
        )

        var search = undefined
        if (this.props.search) {
            search = <input tabIndex="0" className="search" type="text" />
        }

        const dropdownClassName = `ui ${this.props.search?'search':''} ${this.state.status} selection dropdown`

        return (
          <div className={className}>
            {label}
            <div ref="dropdown" tabIndex="0" className={dropdownClassName}>
              <input ref="value" name={this.props.name} value={this.getValue()} type="hidden" />
              <i className="dropdown icon"></i>
              {search}
              <div className="default text">{this.state.placeholder}</div>
              <div tabIndex="-1" className="menu transition hidden">
                {items}
              </div>
            </div>
            <span className='validation-error'>{errorMessage}</span>
          </div>
        )
    }
}

reactMixin.onClass(SemanticDropdown, Formsy.Mixin)

const Dropdown = SemanticDropdown



class SemanticDatePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayName: null,
            placeholder: null,
            display: undefined
        }

    }

    setModelValue(value) {
        this.setValue(value==undefined?undefined:moment(value).format())
        this.setState({
            display: value==undefined?'':moment(this.getValue()).format('DD/MM/YYYY')
        })
    }

    changeValue(event) {
        const value = event.currentTarget.value
        this.setValue(moment(value, 'DD/MM/YYYY').format())
        this.setState({
            display: value==undefined?'':moment(this.getValue()).format('DD/MM/YYYY')
        })
    }

    setSchema(schema) {
        this.setState(schema)
    }

    componentDidMount() {
        $(this.refs.value).daterangepicker({
            singleDatePicker: true,
            format: 'DD/MM/YYYY'
        }, function(start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        })


        $(this.refs.value).on('apply.daterangepicker', this.changeValue.bind(this))
    }

    render() {

        const numbers = ["", "one", "two", "three", "four", "five", "six",
          "seven", "eight", "nine", "ten", "eleven", "twelve", "threeteen", "fourteen", "fiveteen", "sixteen"]
        var number = numbers[this.props.width || 0]

        var label = undefined
        if(this.state.displayName != null && !this.props.nolabel)
            label = <label htmlFor={this.props.name}>{this.state.displayName}</label>

        const className = (number!==""? (number + " wide ") : "") + "field"

          // An error message is returned ONLY if the component is invalid
          // or the server has returned an error message
        const errorMessage = this.getErrorMessage();

        return (
          <div className={className}>
            {label}
            <div className="ui right icon input">
              <input
                ref="value"
                type="text"
                name={this.props.name}
                onChange={this.changeValue}
                value={this.state.display}
                placeholder={this.state.placeholder}
              />
              <i className="calendar icon"></i>
            </div>
            <span className='validation-error'>{errorMessage}</span>
          </div>
        )
    }
}

reactMixin.onClass(SemanticDatePicker, Formsy.Mixin)

const DatePicker = SemanticDatePicker

