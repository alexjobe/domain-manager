import React, {Component} from 'react';
import TextInput from '../General/TextInput';

class EditHostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      hostName: this.props.host.name,
      userName: this.props.host.userName,
      password: this.props.host.password,
      notes: this.props.host.notes
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
    if(this.state.hostName) {
      // Create updated host object
      var updatedHost = this.props.host;
      updatedHost.name = this.state.hostName;
      updatedHost.userName = this.state.userName;
      updatedHost.password = this.state.password;
      updatedHost.notes = this.state.notes;

      // Call updateHost(), which is passed from HostList as a prop
      this.props.updateHost(updatedHost);
      this.props.disableEditMode();
    }
  }

  render() {
    return (
      <section id="hostEditForm">
        <form id="hostEditInput">
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
          >Update Host</button>
        </form>
      </section>
    )
  }
}

export default EditHostForm;