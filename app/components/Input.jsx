var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var classNames = require('classnames'); 
var Icon = require('./Icon.jsx');
var InputError = require('./InputError.jsx');
var PasswordValidator = require('./PasswordValidator.jsx');

var cx = classNames;

module.exports = class Input extends React.Component {

  constructor(props){
    super(props);
    var valid = (this.props.isValid && this.props.isValid()) || true;
    
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.mouseEnterError = this.mouseEnterError.bind(this);
    this.hideError = this.hideError.bind(this);
    this.isValid = this.isValid.bind(this);
    this.setValidity = this.setValidity.bind(this);
    
    this.state = {
      valid: valid,
      empty: _.isEmpty(this.props.value),
      focus: false,
      value: '',
      disabled: this.props.disabled,
      iconsVisible: !this.props.validator,
      errorMessage: this.props.emptyMessage,
      validator: this.props.validator,
      validatorVisible: false,
      type: this.props.type,
      minCharacters: this.props.minCharacters,
      requireCapitals: this.props.requireCapitals,
      requireNumbers: this.props.requireNumbers,
      errorVisible: false,
      forbiddenWords: this.props.forbiddenWords,
      hideValidationIcons: this.props.hideValidationIcons,
      isValidatorValid: {
        minChars: false,
        capitalLetters: false,
        numbers: false,
        words: false,
        all: false,
      },
      allValidatorValid: false
    }
  }

  handleChange(event){
    this.setState({
      value: event.target.value,
      empty: _.isEmpty(event.target.value)
    });

    if(this.props.validator) {
      this.checkRules(event.target.value)
    }

    // call input's validation method
    if(this.props.validate) {
      this.validateInput(event.target.value);
    }

    // call onChange method on the parent component for updating it's state
    if(this.props.onChange) {
      this.props.onChange(event);
    }
  }

  validateInput(value) {
    // trigger custom validation method in the parent component
    if(this.props.validate && this.props.validate(value)){
      this.setState({
        valid: true,
        errorVisible: false
      });
    } else {
      this.setState({
        valid: false,
        errorMessage: !_.isEmpty(value) ? this.props.errorMessage : this.props.emptyMessage
      });  
    }

  }

  componentWillReceiveProps(newProps) {    
    // perform update only when new value exists and not empty  
    if(newProps.value) {
      if(!_.isUndefined(newProps.value) && newProps.value.length > 0) {
        if(this.props.validate) {
          this.validateInput(newProps.value);
        }
        this.setState({
          value: newProps.value,
          empty: _.isEmpty(newProps.value)
        });
      }   
    }
  }

  isValid() {
    if(this.props.validate) {
      if(_.isEmpty(this.state.value) || !this.props.validate(this.state.value)) {
        this.setState({
          valid: false,
          errorVisible: true
        });
      }
    }
   
    return this.state.valid;
  }
  setValidity(validity) {
    this.setState({
      valid: validity,
      errorVisible: !validity
    });
  }

  handleFocus() {
    this.setState({
      focus: true,
      validatorVisible: true
    });

    // hide error when validator is active
    if(this.props.validator) {
      this.setState({
        errorVisible: false
      })
    }
  }

  handleBlur() {
    this.setState({
      focus: false,
      errorVisible: !this.state.valid,
      validatorVisible: false
    });
  }

  mouseEnterError() {
    this.setState({
      errorVisible: true
    });
  }

  hideError() {
    this.setState({
      errorVisible: false,
      validatorVisible: false
    });
  }

  // validator function
  checkRules(value) {
    var validData = {
      minChars: !_.isEmpty(value) ? value.length >= parseInt(this.state.minCharacters): false,
      capitalLetters: !_.isEmpty(value) ? this.countCapitals(value): false,
      numbers: !_.isEmpty(value) ? this.countNumbers(value) > 0 : false,
      words: !_.isEmpty(value) ? !this.checkWords(value) : false
    }
    var allValid = (validData.minChars && validData.capitalLetters && validData.numbers && validData.words);

    this.setState({
      isValidatorValid: validData,
      allValidatorValid: allValid,
      valid: allValid
    })
  }

  countCapitals(value) {
    var str = value;
    return str.replace(/[^A-Z]/g, "").length;
  }

  countNumbers(value) {
    return /\d/.test(value);
  }

  checkWords(value) {
    return  _.some(this.state.forbiddenWords, function (word) {
      var matched = (word === value) ? true : "";
      return matched
    })
  }

  render(){

    var inputGroupClasses = cx({
      'input_group':     true,
      'input_valid':     this.state.valid,
      'input_error':     !this.state.valid,
      'input_empty':     this.state.empty,
      'input_hasValue':  !this.state.empty,
      'input_focused':   this.state.focus,
      'input_unfocused': !this.state.focus
    });
    var validator;
    var validationIcons = this.state.hideValidationIcons == false ? React.createElement(        
        <div className="validationIcons">
          <i className="input_error_icon" onMouseEnter={this.mouseEnterError}> <Icon type="circle_error"/> </i>
          <i className="input_valid_icon"> <Icon type="circle_tick"/> </i>
        </div>) : null;

    if(this.state.validator) {
      validator = 
        <PasswordValidator
          ref="passwordValidator"
          visible={this.state.validatorVisible}
          name={this.props.text}
          value={this.state.value}
          validData={this.state.isValidatorValid}
          valid={this.state.allValidatorValid}
          forbiddenWords={this.state.forbiddenWords}
          minCharacters={this.props.minCharacters}
          requireCapitals={this.props.requireCapitals}
          requireNumbers={this.props.requireNumbers}
        />
    }
    if(this.props.visible)
    {
      return null;
    }
    var disabled = this.props.disabled ? "disabled='disabled'" : null;
    return (
      <div className={inputGroupClasses}>
        <label className="input_label" htmlFor={this.props.text}>
          <span className="label_text">{this.props.text}</span>
        </label>
        <input 
          placeholder={this.props.placeholder} 
          className="input" 
          id={this.props.text}
          defaultValue={this.props.defaultValue} 
          onChange={this.handleChange} 
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          autoComplete="off"
          type={this.props.type}
          disabled={this.props.disabled}
        />
        <InputError 
          visible={this.state.errorVisible} 
          errorMessage={this.state.errorMessage} 
        />
        {validationIcons}

        {validator}

      </div>
    );
  }
};
