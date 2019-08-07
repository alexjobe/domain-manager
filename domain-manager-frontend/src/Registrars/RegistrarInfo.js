import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditRegistrarForm from './EditRegistrarForm';

class RegistrarInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      enableEditMode: false
    }
    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
  }

  enableEditMode() {
    this.setState({enableEditMode: true});
  }

  disableEditMode() {
    this.setState({enableEditMode: false});
  }

  renderRegistrarInfo() {
    return(
      <div id="registrarInfoDisplay">
        <BackButton onClick={this.props.deselectRegistrar}></BackButton>
        <h1>Registrar Info:</h1>
        <p>
          Registrar: {this.props.registrar.name} <br />
          Username: {this.props.registrar.userName} <br />
          Password: {this.props.registrar.password} <br />
        </p>
        Notes:
        <textarea
          rows='10'
          name='notes'
          value={this.props.registrar.notes}
          placeholder='Notes...'
          readOnly
          disabled
        />
        <button onClick={this.enableEditMode}>Edit Registrar</button>
        <button onClick={this.props.deleteRegistrar}>Delete Registrar</button>
      </div>
    )
  }

  renderRegistrarEdit () {
    return (
      <div id="registrarEdit">
        <BackButton onClick={this.disableEditMode}></BackButton>
        <h1>Edit Registrar</h1>
        <EditRegistrarForm 
          registrar={this.props.registrar} 
          updateRegistrar={this.props.updateRegistrar} 
          disableEditMode={this.disableEditMode}
        />
      </div>
    )
  }

  render() {
    return(
      <div id='registrarInfo'>
        {
          this.state.enableEditMode ?
            this.renderRegistrarEdit()
          : this.renderRegistrarInfo()
        }
      </div>
    )
  }
}

export default RegistrarInfo;