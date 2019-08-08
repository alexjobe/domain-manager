import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditWebsiteForm from './EditWebsiteForm';

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
        <h1>Website Info:</h1>
        <p>
          Website: {this.props.website.name} <br />
          URL: {this.props.website.url} <br />
          FTP: {this.props.website.ftp} <br />
          Username: {this.props.website.userName} <br />
          Password: {this.props.website.password} <br />
          {this.props.website.registrar && this.props.website.registrar.name ? 
            'Registrar: ' + this.props.website.registrar.name : ''} <br />
          {this.props.website.host && this.props.website.host.name ? 
            'Host: ' + this.props.website.host.name : ''}
        </p>
        Notes: 
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
        <h1>Edit Website</h1>
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