import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditRegistrarForm from './EditRegistrarForm';
import WebsiteList from '../Websites/WebsiteList';
import CopyableText from '../General/CopyableText';

class RegistrarInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      enableEditMode: false,
      enableViewWebsites: false
    }
    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
    this.enableViewWebsites = this.enableViewWebsites.bind(this);
    this.disableViewWebsites = this.disableViewWebsites.bind(this);
  }

  enableEditMode() {
    this.setState({enableEditMode: true});
  }

  disableEditMode() {
    this.setState({enableEditMode: false});
  }

  enableViewWebsites() {
    this.setState({enableViewWebsites: true});
  }

  disableViewWebsites() {
    this.setState({enableViewWebsites: false});
  }

  renderRegistrarInfo() {
    return(
      <div id="registrarInfoDisplay">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h2>Registrar: {this.props.registrar.name}</h2>
        <div className='list-item'><label>Username:</label><CopyableText value={this.props.registrar.userName}/></div>
        <div className='list-item'><label>Password:</label><CopyableText value={this.props.registrar.password}/></div>
        <div className='list-item'><label>Notes:</label></div>
        <textarea
          rows='10'
          name='notes'
          value={this.props.registrar.notes}
          placeholder='Notes...'
          readOnly
          disabled
        />
        <button onClick={this.enableViewWebsites}>Registered Websites</button>
        <button onClick={this.enableEditMode}>Edit Registrar</button>
        <button onClick={this.props.deleteRegistrar}>Delete Registrar</button>
      </div>
    )
  }

  renderRegistrarEdit () {
    return (
      <div id="registrarEdit">
        <BackButton onClick={this.disableEditMode}></BackButton>
        <h2>Edit Registrar</h2>
        <EditRegistrarForm 
          registrar={this.props.registrar} 
          updateRegistrar={this.props.updateRegistrar} 
          disableEditMode={this.disableEditMode}
        />
      </div>
    )
  }

  renderRegistrarWebsites() {
    return (
      <WebsiteList 
        goBack={this.disableViewWebsites}
        websites={this.props.websites}
        registrars={this.props.registrars}
        hosts={this.props.hosts}
        updateWebsites={this.props.updateWebsites}
        selectedRegistrar={this.props.registrar}
      />
    )
  }

  render() {
    if(this.state.enableEditMode){
      return this.renderRegistrarEdit();
    }
    if(this.state.enableViewWebsites){
      return this.renderRegistrarWebsites();
    }
    return this.renderRegistrarInfo();
  }
}

export default RegistrarInfo;