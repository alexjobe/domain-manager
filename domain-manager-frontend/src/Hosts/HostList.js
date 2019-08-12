import React, { Component } from 'react'
import * as apiCalls from '../api';
import HostItem from './HostItem';
import AddHostForm from './AddHostForm';
import HostInfo from './HostInfo';
import BackButton from '../General/BackButton';
import Search from '../General/Search';

class HostList extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedHost: null,
      enableAddHost: false
    }
    this.addHost = this.addHost.bind(this);
    this.enableAddHost = this.enableAddHost.bind(this);
    this.disableAddHost = this.disableAddHost.bind(this);
    this.selectHost = this.selectHost.bind(this);
    this.deselectHost = this.deselectHost.bind(this);
    this.updateHost = this.updateHost.bind(this);
    this.searchHosts = this.searchHosts.bind(this);
  }

  async addHost(host) {
    // Create new host and update state
    let newHost = await apiCalls.createHost(host);
    this.props.updateHosts([...this.props.hosts, newHost]) // ... is the spread operator
  }

  enableAddHost() {
    this.setState({enableAddHost: true});
    this.searchHosts(''); // Clear search results when changing view
  }

  disableAddHost() {
    this.setState({enableAddHost: false});
  }

  selectHost(host) {
    this.setState({selectedHost: host})
    this.setState({enableAddHost: false});
    this.searchHosts(''); // Clear search results when changing view
  }

  deselectHost() {
    this.setState({selectedHost: null});
  }

  async updateHost(host) {
    // Update host
    let updatedHost = await apiCalls.updateHost(host);
    // Find host in hosts and replace it with updatedHost
    const hosts = this.props.hosts.map(host => {
      return (host === updatedHost._id ? updatedHost : host);
    });
    // Update state
    this.props.updateHosts(hosts)
  }

  async deleteHost(host) {
    this.setState({selectedHost: null});
    await apiCalls.removeHost(host._id);
    const hosts = this.props.hosts.filter(r => r._id !== host._id);
    this.props.updateHosts(hosts);
  }

  async searchHosts(query) {
    if(query !== '') {
      let matchingHosts = await apiCalls.searchHosts(query);
      this.props.updateHosts(matchingHosts);
    } else {
      let allHosts = await apiCalls.getHosts();
      this.props.updateHosts(allHosts);
    }
  }

  renderHostList() {
    const hosts = this.props.hosts.map((r) => (
      <HostItem
        key={r._id}
        {...r}
        id={r._id}
        onSelect={this.selectHost.bind(this, r)}
      />
    ));
    return (
      <div className="HostList">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h2>All Hosts</h2>
        <Search search={this.searchHosts}></Search>
        <ul>
          {hosts}
        </ul>
        <button onClick={this.enableAddHost}>Add Host</button>
      </div>
    )
  }

  renderAddHost(){
    return(
      <div id="hostAddNew">
        <BackButton onClick={this.disableAddHost}></BackButton>
        <h2>New Host</h2>
        <AddHostForm 
          addHost={this.addHost} 
          disableAddHost={this.disableAddHost}
        />
      </div>
    )
  }

  renderHostInfo(){
    return (
      <HostInfo 
        host={this.state.selectedHost} 
        goBack={this.deselectHost}
        updateHost={this.updateHost}
        deleteHost={this.deleteHost.bind(this, this.state.selectedHost)}
        websites={this.props.websites}
        registrars={this.props.registrars}
        hosts={this.props.hosts}
        updateWebsites={this.props.updateWebsites}
      />
    )
  }

  render() {
    if(this.state.selectedHost !== null){
      return this.renderHostInfo();
    }
    if(this.state.enableAddHost){
      return this.renderAddHost();
    }
    return this.renderHostList();
  }
}

export default HostList;