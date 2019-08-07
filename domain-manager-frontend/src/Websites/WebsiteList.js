import React, { Component } from 'react'
import WebsiteItem from './WebsiteItem';
import * as apiCalls from '../api';
import WebsiteInfo from './WebsiteInfo';
import AddWebsiteForm from './AddWebsiteForm';
import BackButton from '../General/BackButton';

class WebsiteList extends Component {

  constructor(props){
    super(props);
    this.state = {
      websites: [],
      registrars: [],
      hosts: [],
      selectedWebsite: null,
      enableAddWebsite: false
    }
    this.addWebsite = this.addWebsite.bind(this);
    this.enableAddWebsite = this.enableAddWebsite.bind(this);
    this.disableAddWebsite = this.disableAddWebsite.bind(this);
    this.selectWebsite = this.selectWebsite.bind(this);
    this.deselectWebsite = this.deselectWebsite.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.deleteWebsite = this.deleteWebsite.bind(this);
  }

  componentWillMount(){
    this.loadWebsites();
    this.loadRegistrars();
    this.loadHosts();
  }

  async loadWebsites(){
    let websites = await apiCalls.getWebsites();
    this.setState({websites});
  }

  async loadRegistrars(){
    let registrars = await apiCalls.getRegistrars();
    this.setState({registrars});
  }

  async loadHosts(){
    let hosts = await apiCalls.getHosts();
    this.setState({hosts});
  }

  async addWebsite(website) {
    // Create new website and update state
    let newWebsite = await apiCalls.createWebsite(website);
    this.setState({websites: [...this.state.websites, newWebsite]}) // ... is the spread operator
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

  async updateWebsite(website) {
    // Update website
    let updatedSite = await apiCalls.updateWebsite(website);
    // Find website in websites and replace it with updatedSite
    const websites = this.state.websites.map(website => {
      return (website._id === updatedSite._id ? updatedSite : website);
    });
    // Update state
    if(this.state.selectedWebsite._id === updatedSite._id){
      this.setState({selectedWebsite: updatedSite});
    }
    this.setState({websites: websites})
  }

  async deleteWebsite(website) {
    this.setState({selectedWebsite: null});
    await apiCalls.removeWebsite(website._id);
    const websites = this.state.websites.filter(w => w._id !== website._id);
    this.setState({websites: websites});
  }

  renderWebsiteList() {
    const websites = this.state.websites.map((w) => (
      <WebsiteItem
        key={w._id}
        {...w}
        id={w._id}
        onSelect={this.selectWebsite.bind(this, w)}
      />
    ));
    return (
      <div className="WebsiteList">
        <BackButton onClick={this.props.enableHomeView}></BackButton>
        <h1>Website List</h1>
        <ul>
          {websites}
        </ul>
        <button onClick={this.enableAddWebsite}>Add Website</button>
      </div>
    )
  }

  renderAddWebsite(){
    return (
      <div id="websiteAddNew">
        <BackButton onClick={this.disableAddWebsite}></BackButton>
        <AddWebsiteForm 
          addWebsite={this.addWebsite} 
          disableAddWebsite={this.disableAddWebsite}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
        />
      </div>
    )
  }

  renderWebsiteInfo(){
    return (
      <WebsiteInfo 
        website={this.state.selectedWebsite} 
        deselectWebsite={this.deselectWebsite}
        updateWebsite={this.updateWebsite}
        deleteWebsite={this.deleteWebsite.bind(this, this.state.selectedWebsite)}
        registrars={this.state.registrars}
        hosts={this.state.hosts}
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