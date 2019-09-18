import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditWebsiteForm from './EditWebsiteForm';
import CopyableText from '../General/CopyableText';
import RegistrarInfo from '../Registrars/RegistrarInfo';
import HostInfo from '../Hosts/HostInfo';

class WebsiteInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      enableEditMode: false,
      enableViewRegistrar: false,
      enableViewHost: false
    }
  }

  enableState(state, isEnabled) {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
  }

  renderWebsiteInfo() {
    return (
      <div id="websiteInfoDisplay">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h2>Website: {this.props.website.name}</h2>
        {this.props.website.registrar && this.props.website.registrar.name ? 
          <div className='list-item' onClick={this.enableState.bind(this, 'enableViewRegistrar', true)}>
            <strong>
              Registrar: {this.props.website.registrar.name}
            </strong>
          </div>
          : ''
        }
        {this.props.website.host && this.props.website.host.name ? 
          <div className='list-item' onClick={this.enableState.bind(this, 'enableViewHost', true)}>
            <strong>
              Host: {this.props.website.host.name}
            </strong>
          </div>
          : ''
        }
        <div className='list-item'><label>URL:</label><CopyableText value={this.props.website.url}/></div>
        <div className='list-item'><label>Username:</label><CopyableText value={this.props.website.userName}/></div>
        <div className='list-item'><label>Password:</label><CopyableText value={this.props.website.password}/></div>
        <div className='list-item'><label>FTP:</label><CopyableText value={this.props.website.ftp}/></div>
        <div className='list-item'><label>Notes:</label></div>
        <textarea
          rows='10'
          name='notes'
          value={this.props.website.notes}
          placeholder='Notes...'
          readOnly
          disabled
        />
        <button onClick={this.enableState.bind(this, 'enableEditMode', true)}>Edit Website</button>
        <button onClick={this.props.deleteWebsite}>Delete Website</button>
      </div>
    )
  }

  renderWebsiteEdit() {
    return (
      <div id="websiteEdit">
        <BackButton onClick={this.enableState.bind(this, 'enableEditMode', false)}></BackButton>
        <h2>Edit Website</h2>
        <EditWebsiteForm 
          website={this.props.website} 
          updateWebsite={this.props.updateWebsite} 
          disableEditMode={this.enableState.bind(this, 'enableEditMode', false)}
          registrars={this.props.registrars}
          hosts={this.props.hosts}
        />
      </div>
    )
  }

  renderRegistrarInfo(){
    return (
      <div id='websiteRegistrarInfo'>
        <BackButton onClick={this.enableState.bind(this, 'enableViewRegistrar', false)}></BackButton>
        <h2>Website: {this.props.website.name}</h2>
        <RegistrarInfo 
          registrar={this.props.website.registrar}
          selectedWebsite={this.props.website}
        />
      </div>
    )
  }

  renderHostInfo(){
    return (
      <div id='websiteHostInfo'>
        <BackButton onClick={this.enableState.bind(this, 'enableViewHost', false)}></BackButton>
        <h2>Website: {this.props.website.name}</h2>
        <HostInfo 
          host={this.props.website.host}
          selectedWebsite={this.props.website}
        />
      </div>
    )
  }

  render() {
    if(this.state.enableEditMode){
      return this.renderWebsiteEdit();
    }
    if(this.state.enableViewRegistrar){
      return this.renderRegistrarInfo();
    }
    if(this.state.enableViewHost){
      return this.renderHostInfo();
    }
    return this.renderWebsiteInfo();
  }
}

export default WebsiteInfo;