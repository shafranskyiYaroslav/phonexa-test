import React from 'react';
import SecondStep from './SecondStep';
import store from '../state';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      companyName: '',
      password: '',
      confirmPassword: '',
      formErrors: {
        firstName: '',
        lastName: '',
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      formValid: false,
      firstNameValid: false,
      lastNameValid: false,
      loginValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPassvordValid: false,
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    store.dispatch({type: 'SUBMIT_FIRST_STEP'});
  };

  handleClick = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [event.target.name]: event.target.value,
      },
      () => {
        this.validateField(name, value)
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let loginValid = this.state.loginValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPassvordValid;
    const specialSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-'];
    
    switch(fieldName) {
      case 'firstName':
        firstNameValid = value.length > 0 && /^[a-zA-Z]+$/.test(value);
        fieldValidationErrors.firstName = firstNameValid ? '': 'This field is required';
        break;
      case 'lastName':
        lastNameValid = value.length > 0 && /^[a-zA-Z]+$/.test(value);
        fieldValidationErrors.lastName = lastNameValid ? '': 'This field is required';
        break;
      case 'login':
        loginValid = value.length > 0 && /^[a-zA-Z]+$/.test(value);
        fieldValidationErrors.login = loginValid ? '': 'This field is requied';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'This field is requied';
        break;
      case 'password':
        passwordValid = (value.toLowerCase() !== value) && (value.split('').some(el => !isNaN(el))) && (specialSymbols.some(symbol => value.indexOf(symbol) !== -1));
        fieldValidationErrors.password = passwordValid ? '': ' Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character (!@#$%^&*-)';
        break;
      case 'confirmPassword':
        confirmPasswordValid = value === this.state.password;
        fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': 'Must be equal to password'
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    firstNameValid: firstNameValid,
                    lastNameValid: lastNameValid,
                    loginValid: loginValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    confirmPasswordValid: confirmPasswordValid,
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.loginValid && this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid});
  }

  render() {
      const { isFirstStepHidden } = store.getState();
    return (
      <React.Fragment>
        <div className='form-div clearfix'>
          <form name='userForm'
          id='userForm'
          style={isFirstStepHidden ? {display: 'none'} : {display: 'block'}}
          onSubmit={this.handleSubmit}>          
            <h5>Register a new user</h5>
            <div className='label-div'>
              <label>
                <input 
                name='firstName' 
                value={this.state.firstName} 
                onChange={this.handleClick} 
                placeholder='First Name*'
                style={this.state.formErrors.firstName.length > 0 ? {borderColor: 'red'} : {borderColor: '#b4b1a5'}}></input>
                <p className='error-p'>{this.state.formErrors.firstName}</p>
              </label>
            </div>
            <div className='label-div'>
              <label>
                <input
                name='lastName'
                value={this.state.lastName}
                onChange={this.handleClick}
                placeholder='Last Name*'
                style={this.state.formErrors.lastName.length > 0 ? {borderColor: 'red'} : {borderColor: '#b4b1a5'}}></input>
                <p className='error-p'>{this.state.formErrors.lastName}</p>
              </label>
            </div>
            <div className='label-div'>
              <label>
                <input
                name='login'
                value={this.state.login}
                onChange={this.handleClick}
                placeholder='Login*'
                style={this.state.formErrors.login.length > 0 ? {borderColor: 'red'} : {borderColor: '#b4b1a5'}}></input>
                <p className='error-p'>{this.state.formErrors.login}</p>
              </label>
            </div>
            <div className='label-div'>
              <label>
                <input
                name='email'
                value={this.state.email}
                onChange={this.handleClick}
                placeholder='Email*'
                style={this.state.formErrors.email.length > 0 ? {borderColor: 'red'} : {borderColor: '#b4b1a5'}}></input>
                <p className='error-p'>{this.state.formErrors.email}</p>
              </label>
            </div>
            <div className='label-div'>
              <label>
                <input
                name='companyName'
                value={this.state.companyName}
                onChange={this.handleClick}
                placeholder='Company Name'></input>
                <p></p>
              </label>
            </div>
            <div className='label-div'>
              <label>
                <input
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.handleClick}
                placeholder='Password*'
                style={this.state.formErrors.password.length > 0 ? {borderColor: 'red'} : {borderColor: '#b4b1a5'}}></input>
                <p className='error-p'>{this.state.formErrors.password}</p>
              </label>
            </div>
            <div className='label-div'>
              <label>
                <input
                name='confirmPassword'
                type='password'
                value={this.state.confirmPassword}
                onChange={this.handleClick}
                placeholder='Confirm Password*'
                style={this.state.formErrors.confirmPassword.length > 0 ? {borderColor: 'red'} : {borderColor: '#b4b1a5'}}></input>
                <p className='error-p'>{this.state.formErrors.confirmPassword}</p>
              </label>
            </div>
            <button type='submit' className="btn btn-primary" disabled={!this.state.formValid}>Next Step</button>
          </form>
        </div>
        <SecondStep userInfo={[this.state.firstName, this.state.lastName, this.state.login, this.state.email, this.state.companyName]}/>
      </React.Fragment>
    )
  }
}

export default UserForm;
