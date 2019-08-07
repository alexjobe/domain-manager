import React, {Component} from 'react';

class EditRegistrarForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      registrarName: this.props.registrar.name,
      userName: this.props.registrar.userName,
      password: this.props.registrar.password,
      notes: this.props.registrar.notes
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
    // Create updated registrar object
    var updatedRegistrar = this.props.registrar;
    updatedRegistrar.name = this.state.registrarName;
    updatedRegistrar.userName = this.state.userName;
    updatedRegistrar.password = this.state.password;
    updatedRegistrar.notes = this.state.notes;

    // Call updateRegistrar(), which is passed from RegistrarList as a prop
    this.props.updateRegistrar(updatedRegistrar);
    this.props.disableEditMode();
  }

  render() {
    return (
      <section id="editRegistrarForm">
        <form id="registrarInput">
          <input
            type='text'
            name='registrarName'
            value={this.state.registrarName}
            onChange={this.handleChange}
            placeholder='Registrar'
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
          >Update Registrar</button>
        </form>
      </section>
    )
  }
}

export default EditRegistrarForm;