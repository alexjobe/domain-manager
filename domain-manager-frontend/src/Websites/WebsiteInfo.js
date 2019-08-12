import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditWebsiteForm from './EditWebsiteForm';
import CopyableText from '../General/CopyableText';

class WebsiteInfo extends Component {

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

  renderWebsiteInfo() {
    return (
      <div id="websiteInfoDisplay">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h2>Website: {this.props.website.name}</h2>
        {this.props.website.registrar && this.props.website.registrar.name ? 
          <div className='list-item'><label>Registrar: {this.props.website.registrar.name}</label></div>
          : ''
        }
        {this.props.website.host && this.props.website.host.name ? 
          <div className='list-item'><label>Host: {this.props.website.host.name}</label></div>
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
        <button onClick={this.enableEditMode}>Edit Website</button>
        <button onClick={this.props.deleteWebsite}>Delete Website</button>
      </div>
    )
  }

  renderWebsiteEdit() {
    return (
      <div id="websiteEdit">
        <BackButton onClick={this.disableEditMode}></BackButton>
        <h2>Edit Website</h2>
        <EditWebsiteForm 
          website={this.props.website} 
          updateWebsite={this.props.updateWebsite} 
          disableEditMode={this.disableEditMode}
          registrars={this.props.registrars}
          hosts={this.props.hosts}
        />
      </div>
    )
  }

  render() {
    return(
      <div id='websiteInfo'>
        {
          this.state.enableEditMode ?
            this.renderWebsiteEdit()
          : this.renderWebsiteInfo()
        }
      </div>
    )
  }
}

export default WebsiteInfo;