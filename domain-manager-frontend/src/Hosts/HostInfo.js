import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditHostForm from './EditHostForm';
import WebsiteList from '../Websites/WebsiteList';
import CopyableText from '../General/CopyableText';

class HostInfo extends Component {

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

  renderHostInfo() {
    return(
      <div id="hostInfoDisplay">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h2>Host: {this.props.host.name}</h2>
        <div className='list-item'><label>Username:</label><CopyableText value={this.props.host.userName}/></div>
        <div className='list-item'><label>Password:</label><CopyableText value={this.props.host.password}/></div>
        <div className='list-item'><label>Notes:</label></div>
        <textarea
          rows='10'
          name='notes'
          value={this.props.host.notes}
          placeholder='Notes...'
          readOnly
          disabled
        />
        <button onClick={this.enableViewWebsites}>Hosted Websites</button>
        <button onClick={this.enableEditMode}>Edit Host</button>
        <button onClick={this.props.deleteHost}>Delete Host</button>
      </div>
    )
  }

  renderHostEdit() {
    return (
      <div id="hostEdit">
        <BackButton onClick={this.disableEditMode}></BackButton>
        <h2>Edit Host</h2>
        <EditHostForm 
          host={this.props.host} 
          updateHost={this.props.updateHost} 
          disableEditMode={this.disableEditMode}
        />
      </div>
    )
  }

  renderHostWebsites() {
    return (
      <WebsiteList 
        goBack={this.disableViewWebsites}
        websites={this.props.websites}
        registrars={this.props.registrars}
        hosts={this.props.hosts}
        updateWebsites={this.props.updateWebsites}
        selectedHost={this.props.host}
      />
    )
  }

  render() {
    if(this.state.enableEditMode){
      return this.renderHostEdit();
    }
    if(this.state.enableViewWebsites){
      return this.renderHostWebsites();
    }
    return this.renderHostInfo();
  }
}

export default HostInfo;