import React, { Component } from 'react'
import WebsiteItem from './WebsiteItem';
import * as apiCalls from './api';
import WebsiteInfo from './WebsiteInfo';
import AddWebsiteForm from './AddWebsiteForm';

class WebsiteList extends Component {

  constructor(props){
    super(props);
    this.state = {
      websites: [],
      selectedWebsite: null
    }
    this.editWebsite = this.editWebsite.bind(this);
    this.addWebsite = this.addWebsite.bind(this);
  }

  componentWillMount(){
    this.loadWebsites();
  }

  async loadWebsites(){
    let websites = await apiCalls.getWebsites();
    this.setState({websites});
  }

  async addWebsite(website) {
    // Create new website and update state
    let newSite = await apiCalls.createWebsite(website);
    this.setState({websites: [...this.state.websites, newSite]}) // ... is the spread operator
  }

  async editWebsite(website) {
    this.setState({selectedWebsite: website})
  }

  renderWebsiteList() {
    const websites = this.state.websites.map((w) => (
      <WebsiteItem
        key={w._id}
        {...w}
        id={w._id}
        onSelect={this.editWebsite.bind(this, w)}
      />
    ));
    return (
      <div className="WebsiteList">
        <h1>Website List</h1>
        <ul>
          {websites}
        </ul>
        <AddWebsiteForm addWebsite={this.addWebsite}/>
      </div>
    )
  }

  render() {
    if(this.state.selectedWebsite !== null){
      return (
        <WebsiteInfo website={this.state.selectedWebsite} />
      )
    }
    return this.renderWebsiteList();
  }
}

export default WebsiteList;