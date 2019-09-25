import React, { Component } from 'react'
import HostListItem from './HostListItem';
import AddHostForm from './AddHostForm';
import HostInfo from './HostInfo';
import Search from '../General/Search';
import Title from '../General/Title';

var apiCalls = require('../Utils/api');

class HostList extends Component {

  state = {
    selectedHost: null,
    enableAddHost: false
  }

  static defaultProps = {
    websites: [],
    registrars: [],
    hosts: []
  };

  addHost = async(host) => {
    if(this.props.checkLogin()) {
      // Create new host and update state
      let newHost = await apiCalls.createHost(host);
      this.props.updateHosts([...this.props.hosts, newHost]) // ... is the spread operator
    }
  }

  enableState = (state, isEnabled) => {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
    this.searchHosts(''); // Clear search results when changing view
  }

  selectHost = (host) => {
    this.setState({selectedHost: host})
    this.setState({enableAddHost: false});
    this.searchHosts(''); // Clear search results when changing view
  }

  deselectHost = () => {
    this.setState({selectedHost: null});
  }

  updateHost = async(host) => {
    if(this.props.checkLogin()) {
      // Update host
      let updatedHost = await apiCalls.updateHost(host);
      // Find host in hosts and replace it with updatedHost
      const hosts = this.props.hosts.map(host => {
        return (host._id === updatedHost._id ? updatedHost : host);
      });
      // Update state
      this.setState({selectedHost: updatedHost});
      this.props.updateHosts(hosts);
    }
  }

  deleteHost = async(host) => {
    if(this.props.checkLogin()) {
      this.setState({selectedHost: null});
      await apiCalls.removeHost(host._id);
      const hosts = this.props.hosts.filter(r => r._id !== host._id);
      this.props.updateHosts(hosts);
    }
  }

  searchHosts = async(query) => {
    if(this.props.checkLogin()) {
      if(query !== '') {
        let matchingHosts = await apiCalls.searchHosts(query);
        this.props.updateHosts(matchingHosts);
      } else {
        let allHosts = await apiCalls.getHosts();
        this.props.updateHosts(allHosts);
      }
    }
  }

  renderHostList = () => {
    const hostListItems = this.props.hosts.map((r) => (
      <HostListItem
        key={r._id}
        {...r}
        id={r._id}
        onSelect={this.selectHost.bind(this, r)}
      />
    ));
    return (
      <div className="HostList">
        <Title titleString="All Hosts" onBack={this.props.goBack}/>
        <Search search={this.searchHosts}></Search>
        <ul>
          {hostListItems}
        </ul>
        <button onClick={this.enableState.bind(this, 'enableAddHost', true)}>Add Host</button>
      </div>
    )
  }

  renderAddHost = () => {
    return(
      <div id="hostAddNew">
        <Title titleString="New Host" onBack={this.enableState.bind(this, 'enableAddHost', false)}/>
        <AddHostForm 
          addHost={this.addHost} 
          disableAddHost={this.enableState.bind(this, 'enableAddHost', false)}
        />
      </div>
    )
  }

  renderHostInfo = () => {
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
        checkLogin={this.props.checkLogin}
      />
    )
  }

  render = () => {
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