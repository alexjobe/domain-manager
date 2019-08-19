import React, {Component} from 'react';
import TextInput from '../General/TextInput';

class AddRegistrarForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      this.props.login(user);
    }
  }

  render() {
    return (
      <section id="login">
        <form id="loginForm">
          <TextInput
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Username'
          />
          <TextInput
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password'
          />
          <button 
            onClick={this.handleSubmit}
          >Login</button>
        </form>
      </section>
    )
  }
}

export default AddRegistrarForm;