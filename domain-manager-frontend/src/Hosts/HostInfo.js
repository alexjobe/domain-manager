import React, { Component } from 'react';
import EditHostForm from './EditHostForm';
import WebsiteList from '../Websites/WebsiteList';
import CopyableText from '../General/CopyableText';
import HostTitle from './HostTitle';
import Title from '../General/Title';

// Display host info. Rendered from HostList and WebsiteInfo.
class HostInfo extends Component {

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
  // websites is passed from HostList as a prop
  renderHostInfo() {
    return(
      <div id="hostInfoDisplay">
        <HostTitle
          selectedWebsite={this.props.selectedWebsite ? true : false}
          hostName={this.props.host.name}
          goBack={this.props.goBack}
        />
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
        {
          this.props.websites ?
            <div id='hostButtons'>
              <button onClick={this.enableState.bind(this, 'enableViewWebsites', true)}>Hosted Websites</button>
              <button onClick={this.enableState.bind(this, 'enableEditMode', true)}>Edit Host</button>
              <button onClick={this.props.deleteHost}>Delete Host</button>
            </div>
          : ''
        }
      </div>
    )
  }

  renderHostEdit() {
    return (
      <div id="hostEdit">
        <Title titleString="Edit Host" onBack={this.enableState.bind(this, 'enableEditMode', false)}/>
        <EditHostForm 
          host={this.props.host} 
          updateHost={this.props.updateHost} 
          disableEditMode={this.enableState.bind(this, 'enableEditMode', false)}
        />
      </div>
    )
  }

  renderHostWebsites() {
    return (
      <WebsiteList 
        goBack={this.enableState.bind(this, 'enableViewWebsites', false)}
        websites={this.props.websites}
        registrars={this.props.registrars}
        hosts={this.props.hosts}
        updateWebsites={this.props.updateWebsites}
        selectedHost={this.props.host}
        checkLogin={this.props.checkLogin}
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