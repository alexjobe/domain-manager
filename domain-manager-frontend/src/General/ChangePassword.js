import React, {Component} from 'react';
var apiCalls = require('../Utils/api');

class ChangePassword extends Component {

  state = {
    oldPassword: '',
    newPassword: '',
    message: ''
  };

  // Called whenever the user presses a key in the input field
  handleChange = (e) => {
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create passwords object, with old and new password
    if(this.state.oldPassword && this.state.newPassword) {
      var passwords = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      }
      // changePassword() is passed from App.js as a prop
      this.changePassword(passwords);
    } else {
      this.setState({message: 'Please enter a password'});
    }
  }

  changePassword = async(passwords) => {
    let resp = await apiCalls.changePassword(passwords);

    if(resp && resp.message) {
      this.setState({oldPassword: ''});
      this.setState({newPassword: ''});
      this.setState({message: resp.message});
    }
  }

  render = () => {
    return (
      <section className="ChangePassword">
        <form id="changePasswordForm">
          <h3>Change Password:</h3>
          <input
            type='password'
            name='oldPassword'
            value={this.state.oldPassword}
            onChange={this.handleChange}
            placeholder='Old Password'
          />
          <input
            type='password'
            name='newPassword'
            value={this.state.newPassword}
            onChange={this.handleChange}
            placeholder='New Password'
          />
          <button 
            onClick={this.handleSubmit}
          >Update</button>
        </form>
        <div className="alert">
          {this.state.message}
        </div>
      </section>
    )
  }
}

export default ChangePassword;