import React, {Component} from 'react';

class AddHostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      hostName: '',
      userName: '',
      password: '',
      notes: ''
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
    // Create host object
    var host = {
        name: this.state.hostName,
        userName: this.state.userName,
        password: this.state.password,
        notes: this.state.notes
    }
    // Call addHost(), which is passed from HostList as a prop
    this.props.addHost(host);
    this.props.disableAddHost();
  }

  render() {
    return (
      <section id="hostAddForm">
        <form id="hostAddInput">
          <input
            type='text'
            name='hostName'
            value={this.state.hostName}
            onChange={this.handleChange}
            placeholder='Host'
          />
          <input
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Username'
          />
          <input
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password'
          />
          <textarea
            rows='10'
            name='notes'
            value={this.state.notes}
            onChange={this.handleChange}
            placeholder='Notes...'
          />
          <button 
            onClick={this.handleSubmit}
          >Add Host</button>
        </form>
      </section>
    )
  }
}

export default AddHostForm;