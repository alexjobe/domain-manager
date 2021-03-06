import React, {Component} from 'react';
import TextInput from '../General/TextInput';

class AddHostForm extends Component {

  state = {
    hostName: '',
    userName: '',
    password: '',
    notes: ''
  };

  // Called whenever the user presses a key in the input field
  handleChange = (e) => {
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create host object
    var host = {
        name: this.state.hostName,
        userName: this.state.userName,
        password: this.state.password,
        notes: this.state.notes
    }
    // Call addHost(), which is passed from HostList as a prop
    if(host.name) {
      this.props.addHost(host);
      this.props.disableAddHost();
    }
  }

  render = () => {
    return (
      <section id="hostAddForm">
        <form id="hostAddInput">
          <TextInput
            type='text'
            name='hostName'
            value={this.state.hostName}
            onChange={this.handleChange}
            placeholder='Host'
          />
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
          <div className="noteInput">
            <label>Notes:</label>
            <textarea
              rows='10'
              name='notes'
              value={this.state.notes}
              onChange={this.handleChange}
              placeholder='Notes...'
            />
          </div>
          <button 
            onClick={this.handleSubmit}
          >Add Host</button>
        </form>
      </section>
    )
  }
}

export default AddHostForm;