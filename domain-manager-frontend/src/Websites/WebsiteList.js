import React, { Component } from 'react';
import * as apiCalls from '../api';
import WebsiteItem from './WebsiteItem';
import WebsiteInfo from './WebsiteInfo';
import AddWebsiteForm from './AddWebsiteForm';
import BackButton from '../General/BackButton';

class WebsiteList extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedWebsite: null,
      enableAddWebsite: false
    }
    this.enableAddWebsite = this.enableAddWebsite.bind(this);
    this.disableAddWebsite = this.disableAddWebsite.bind(this);
    this.selectWebsite = this.selectWebsite.bind(this);
    this.deselectWebsite = this.deselectWebsite.bind(this);
    this.addWebsite = this.addWebsite.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.deleteWebsite = this.deleteWebsite.bind(this);
  }

  enableAddWebsite() {
    this.setState({enableAddWebsite: true});
  }

  disableAddWebsite() {
    this.setState({enableAddWebsite: false});
  }

  selectWebsite(website) {
    this.updateWebsite(website);
    this.setState({selectedWebsite: website})
    this.setState({enableAddWebsite: false});
  }

  deselectWebsite() {
    this.setState({selectedWebsite: null});
  }

  async addWebsite(website) {
    // Create new website and update state
    let newWebsite = await apiCalls.createWebsite(website);
    this.props.updateWebsites([...this.props.websites, newWebsite]) // ... is the spread operator
  }

  async updateWebsite(website) {
    // Update website
    let updatedSite = await apiCalls.updateWebsite(website);
    // Find website in websites and replace it with updatedSite
    const websites = this.props.websites.map(website => {
      return (website._id === updatedSite._id ? updatedSite : website);
    });
    // Update state
    if(this.state.selectedWebsite._id === updatedSite._id){
      this.setState({selectedWebsite: updatedSite});
    }
    this.props.updateWebsites(websites)
  }

  async deleteWebsite(website) {
    this.setState({selectedWebsite: null});
    await apiCalls.removeWebsite(website._id);
    const websites = this.props.websites.filter(w => w._id !== website._id);
    this.props.updateWebsites(websites);
  }

  renderWebsiteList() {
    var websites;
    // If there is a selected host or registrar, only display websites for that host or registrar
    // selectedHost and selectedRegistrar are passed as props from HostInfo and RegistrarInfo, respectively
    if(this.props.selectedHost) {
      websites = this.props.websites.filter(w => w.host && w.host._id === this.props.selectedHost._id);
    }
    else if(this.props.selectedRegistrar) {
      websites = this.props.websites.filter(w => w.registrar && w.registrar._id === this.props.selectedRegistrar._id);
    }
    else {
      websites = this.props.websites;
    }
    const websiteItems = websites.map((w) => (
      <WebsiteItem
        key={w._id}
        {...w}
        id={w._id}
        onSelect={this.selectWebsite.bind(this, w)}
      />
    ));
    return (
      <div className="WebsiteList">
        <BackButton onClick={this.props.goBack}></BackButton>
        {this.props.selectedHost ?
          <h2>{this.props.selectedHost.name}: Websites</h2> 
          : ''
        }
        {this.props.selectedRegistrar ? 
          <h2>{this.props.selectedRegistrar.name}: Websites</h2> 
          : ''
        }
        {!this.props.selectedRegistrar && !this.props.selectedHost ? <h2>All Websites</h2> : ''}
        <ul>
          {websiteItems}
        </ul>
        <button onClick={this.enableAddWebsite}>Add Website</button>
      </div>
    )
  }

  renderAddWebsite(){
    return (
      <div id="websiteAddNew">
        <BackButton onClick={this.disableAddWebsite}></BackButton>
        <h2>
          {this.props.selectedHost ? 
            this.props.selectedHost.name + ': '
            : ''
          }
          {this.props.selectedRegistrar ? 
            this.props.selectedRegistrar.name + ': '
            : ''
          }
          New Website
        </h2>
        <AddWebsiteForm 
          addWebsite={this.addWebsite} 
          disableAddWebsite={this.disableAddWebsite}
          registrars={this.props.registrars}
          hosts={this.props.hosts}
          selectedHost={this.props.selectedHost}
          selectedRegistrar={this.props.selectedRegistrar}
        />
      </div>
    )
  }

  renderWebsiteInfo(){
    return (
      <WebsiteInfo 
        website={this.state.selectedWebsite} 
        goBack={this.deselectWebsite}
        updateWebsite={this.updateWebsite}
        deleteWebsite={this.deleteWebsite.bind(this, this.state.selectedWebsite)}
        registrars={this.props.registrars}
        hosts={this.props.hosts}
      />
    )
  }

  render() {
    if(this.state.selectedWebsite !== null){
      return this.renderWebsiteInfo();
    }
    if(this.state.enableAddWebsite){
      return this.renderAddWebsite();
    }
    return this.renderWebsiteList();
  }
}

export default WebsiteList;