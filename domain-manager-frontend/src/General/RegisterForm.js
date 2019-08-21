import React, {Component} from 'react';
import TextInput from '../General/TextInput';

class RegisterForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Called whenever the user presses a key in the input field
  handleChange(e){
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create user object
    if(this.state.userName && this.state.password) {
      var user = {
        username: this.state.userName,
        password: this.state.password
      }
      // registerUser() is passed from App.js as a prop
      this.props.registerUser(user);
    }
  }

  render() {
    return (
      <section id="register">
        <form id="registerForm">
          <h3>First Time Set Up:</h3>
          <TextInput
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Username'
          />
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password'
          />
          <button 
            onClick={this.handleSubmit}
          >Register</button>
        </form>
      </section>
    )
  }
}

export default RegisterForm;