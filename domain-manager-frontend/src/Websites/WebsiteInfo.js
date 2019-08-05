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
      <div id="infoDisplay">
        <h3>Website Info:</h3>
        <p>
          Website: {this.props.website.name} <br />
          URL: {this.props.website.url} <br />
          FTP: {this.props.website.ftp} <br />
          Username: {this.props.website.userName} <br />
          Password: {this.props.website.password}
        </p>
        Notes: 
        <textarea
          rows='10'
          name='notes'
          value={this.props.website.notes}
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
      <EditWebsiteForm 
        website={this.props.website} 
        updateWebsite={this.props.updateWebsite} 
        disableEditMode={this.disableEditMode}
      />
    )
  }

  render() {
    return(
      <div id='websiteInfo'>
        <BackButton onClick={this.props.deselectWebsite}></BackButton>
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