import React, {Component} from 'react';
import TextInput from '../General/TextInput';

class AddRegistrarForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      registrarName: '',
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
    // Create registrar object
    var registrar = {
        name: this.state.registrarName,
        userName: this.state.userName,
        password: this.state.password,
        notes: this.state.notes
    }
    // Call addRegistrar(), which is passed from RegistrarList as a prop
    if(registrar.name) {
      this.props.addRegistrar(registrar);
      this.props.disableAddRegistrar();
    }
  }

  render() {
    return (
      <section id="registrarAddForm">
        <form id="registrarAddInput">
          <TextInput
            type='text'
            name='registrarName'
            value={this.state.registrarName}
            onChange={this.handleChange}
            placeholder='Registrar'
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
          <textarea
            rows='10'
            name='notes'
            value={this.state.notes}
            onChange={this.handleChange}
            placeholder='Notes...'
          />
          <button 
            onClick={this.handleSubmit}
          >Add Registrar</button>
        </form>
      </section>
    )
  }
}

export default AddRegistrarForm;