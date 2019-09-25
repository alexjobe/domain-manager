import React, { Component } from 'react';
import WebsiteListItem from './WebsiteListItem';
import WebsiteInfo from './WebsiteInfo';
import AddWebsiteForm from './AddWebsiteForm';
import Search from '../General/Search';
import Title from '../General/Title';

var apiCalls = require('../Utils/api');

class WebsiteList extends Component {

  state = {
    selectedWebsite: null,
    enableAddWebsite: false
  }

  static defaultProps = {
    websites: [],
    registrars: [],
    hosts: []
  };

  enableState = (state, isEnabled) => {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
    this.searchWebsites(''); // Clear search results when changing view
  }

  selectWebsite = (website) => {
    this.updateWebsite(website);
    this.setState({selectedWebsite: website})
    this.setState({enableAddWebsite: false});
    this.searchWebsites(''); // Clear search results when changing view
  }

  deselectWebsite = () => {
    this.setState({selectedWebsite: null});
  }

  addWebsite = async(website) => {
    if(this.props.checkLogin()) {
      // Create new website and update state
      let newWebsite = await apiCalls.createWebsite(website);
      this.props.updateWebsites([...this.props.websites, newWebsite]) // ... is the spread operator
    }
  }

  updateWebsite = async(website) => {
    if(this.props.checkLogin()) {
      // Update website
      let updatedSite = await apiCalls.updateWebsite(website);
      // Find website in websites and replace it with updatedSite
      const websites = this.props.websites.map(website => {
        return (website._id === updatedSite._id ? updatedSite : website);
      });
      // Update state
      this.setState({selectedWebsite: updatedSite});
      this.props.updateWebsites(websites)
    }
  }

  deleteWebsite = async(website) => {
    if(this.props.checkLogin()) {
      this.setState({selectedWebsite: null});
      await apiCalls.removeWebsite(website._id);
      const websites = this.props.websites.filter(w => w._id !== website._id);
      this.props.updateWebsites(websites);
    }
  }

  searchWebsites = async(query) => {
    if(this.props.checkLogin()) {
      if(query !== '') {
        let matchingSites = await apiCalls.searchWebsites(query);
        this.props.updateWebsites(matchingSites);
      } else {
        let allSites = await apiCalls.getWebsites();
        this.props.updateWebsites(allSites);
      }
    }
  }

  renderWebsiteList = () => {
    var websites;
    var titleString = "";
    if(this.props.selectedHost) titleString = this.props.selectedHost.name + ": Hosted Websites";
    if(this.props.selectedRegistrar) titleString = this.props.selectedRegistrar.name + ": Registered Websites";
    if(!this.props.selectedRegistrar && !this.props.selectedHost) titleString = "All Websites";

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
    const websiteListItems = websites.map((w) => (
      <WebsiteListItem
        key={w._id}
        {...w}
        id={w._id}
        onSelect={this.selectWebsite.bind(this, w)}
      />
    ));
    return (
      <div className="WebsiteList">
        <Title titleString={titleString} onBack = {this.props.goBack}/>
        <Search search={this.searchWebsites}></Search>
        <ul>
          {websiteListItems}
        </ul>
        <button onClick={this.enableState.bind(this, 'enableAddWebsite', true)}>Add Website</button>
      </div>
    )
  }

  renderAddWebsite = () => {
    var titleString = 'New Website';
    if(this.props.selectedHost) titleString = this.props.selectedHost.name + ': New Website';
    if(this.props.selectedRegistrar) titleString = this.props.selectedRegistrar.name + ': New Website';

    return (
      <div id="websiteAddNew">
        <Title titleString = {titleString} onBack={this.enableState.bind(this, 'enableAddWebsite', false)}/>
        <AddWebsiteForm 
          addWebsite={this.addWebsite} 
          disableAddWebsite={this.enableState.bind(this, 'enableAddWebsite', false)}
          registrars={this.props.registrars}
          hosts={this.props.hosts}
          selectedHost={this.props.selectedHost}
          selectedRegistrar={this.props.selectedRegistrar}
        />
      </div>
    )
  }

  renderWebsiteInfo = () => {
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

  render = () => {
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