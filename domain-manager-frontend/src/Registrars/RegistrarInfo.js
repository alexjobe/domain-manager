import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditRegistrarForm from './EditRegistrarForm';
import WebsiteList from '../Websites/WebsiteList';
import CopyableText from '../General/CopyableText';
import RegistrarTitle from './RegistrarTitle';

// Display registrar info. Rendered from RegistrarList and WebsiteInfo.
class RegistrarInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      enableEditMode: false,
      enableViewWebsites: false
    }
  }

  enableState(state, isEnabled) {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
  }

  // selectedWebsite is passed from WebsiteInfo as a prop
  // websites is passed from RegistrarList as a prop
  renderRegistrarInfo() {
    return(
      <div id="registrarInfoDisplay">
        <RegistrarTitle
          selectedWebsite={this.props.selectedWebsite ? true : false}
          registrarName={this.props.registrar.name}
          goBack={this.props.goBack}
        />
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
        {
          this.props.websites ?
            <div id='registrarButtons'>
              <button onClick={this.enableState.bind(this, 'enableViewWebsites', true)}>Registered Websites</button>
              <button onClick={this.enableState.bind(this, 'enableEditMode', true)}>Edit Registrar</button>
              <button onClick={this.props.deleteRegistrar}>Delete Registrar</button>
            </div>
          : ''
        }
        
      </div>
    )
  }

  renderRegistrarEdit () {
    return (
      <div id="registrarEdit">
        <BackButton onClick={this.enableState.bind(this, 'enableEditMode', false)}></BackButton>
        <h2>Edit Registrar</h2>
        <EditRegistrarForm 
          registrar={this.props.registrar} 
          updateRegistrar={this.props.updateRegistrar} 
          disableEditMode={this.enableState.bind(this, 'enableEditMode', false)}
        />
      </div>
    )
  }

  renderRegistrarWebsites() {
    return (
      <WebsiteList 
        goBack={this.enableState.bind(this, 'enableViewWebsites', false)}
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