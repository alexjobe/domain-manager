import React, { Component } from 'react';
import EditWebsiteForm from './EditWebsiteForm';
import CopyableText from '../General/CopyableText';
import RegistrarInfo from '../Registrars/RegistrarInfo';
import HostInfo from '../Hosts/HostInfo';
import Title from '../General/Title';

class WebsiteInfo extends Component {

  state = {
    enableEditMode: false,
    enableViewRegistrar: false,
    enableViewHost: false
  }

  enableState = (state, isEnabled) => {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
  }

  renderWebsiteInfo = () => {
    let titleString = "Website: " + this.props.website.name;
    return (
      <div id="websiteInfoDisplay">
        <Title  titleString={titleString} onBack={this.props.goBack} />
        {this.props.website.registrar && this.props.website.registrar.name ? 
          <div className='list-item' onClick={this.enableState.bind(this, 'enableViewRegistrar', true)}>
            <label>Registrar:</label><strong>{this.props.website.registrar.name}</strong>
          </div>
          : ''
        }
        {this.props.website.host && this.props.website.host.name ? 
          <div className='list-item' onClick={this.enableState.bind(this, 'enableViewHost', true)}>
            <label>Host:</label><strong>{this.props.website.host.name}</strong>
          </div>
          : ''
        }
        <div className='list-item'><label>URL:</label><CopyableText value={this.props.website.url}/></div>
        <div className='list-item'><label>Username:</label><CopyableText value={this.props.website.userName}/></div>
        <div className='list-item'><label>Password:</label><CopyableText value={this.props.website.password}/></div>
        <div className='list-item'><label>FTP:</label><CopyableText value={this.props.website.ftp}/></div>
        <div className='list-item'><label>Notes:</label>
          <textarea
            rows='10'
            name='notes'
            value={this.props.website.notes}
            placeholder='Notes...'
            readOnly
            disabled
          />
        </div>
        <button onClick={this.enableState.bind(this, 'enableEditMode', true)}>Edit Website</button>
        <button onClick={this.props.deleteWebsite}>Delete Website</button>
      </div>
    )
  }

  renderWebsiteEdit = () => {
    return (
      <div id="websiteEdit">
        <Title titleString="Edit Website" onBack={this.enableState.bind(this, 'enableEditMode', false)}/>
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

  renderRegistrarInfo = () => {
    let titleString = this.props.website.name + ": Registrar";
    return (
      <div id='websiteRegistrarInfo'>
        <Title titleString={titleString} onBack={this.enableState.bind(this, 'enableViewRegistrar', false)}/>
        <RegistrarInfo 
          registrar={this.props.website.registrar}
          selectedWebsite={this.props.website}
        />
      </div>
    )
  }

  renderHostInfo = () => {
    let titleString = this.props.website.name + ": Host";
    return (
      <div id='websiteHostInfo'>
        <Title titleString={titleString} onBack={this.enableState.bind(this, 'enableViewHost', false)}/>
        <HostInfo 
          host={this.props.website.host}
          selectedWebsite={this.props.website}
        />
      </div>
    )
  }

  render = () => {
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