import React, { Component } from 'react'
import * as apiCalls from '../api';
import HostItem from './HostItem';
import AddHostForm from './AddHostForm';
import HostInfo from './HostInfo';
import BackButton from '../General/BackButton';

class HostList extends Component {

  constructor(props){
    super(props);
    this.state = {
      hosts: [],
      selectedHost: null,
      enableAddHost: false
    }
    this.addHost = this.addHost.bind(this);
    this.enableAddHost = this.enableAddHost.bind(this);
    this.disableAddHost = this.disableAddHost.bind(this);
    this.selectHost = this.selectHost.bind(this);
    this.deselectHost = this.deselectHost.bind(this);
    this.updateHost = this.updateHost.bind(this);
  }

  componentWillMount(){
    this.loadHosts();
  }

  async loadHosts(){
    let hosts = await apiCalls.getHosts();
    this.setState({hosts});
  }

  async addHost(host) {
    // Create new host and update state
    let newHost = await apiCalls.createHost(host);
    this.setState({hosts: [...this.state.hosts, newHost]}) // ... is the spread operator
  }

  enableAddHost() {
    this.setState({enableAddHost: true});
  }

  disableAddHost() {
    this.setState({enableAddHost: false});
  }

  selectHost(host) {
    this.setState({selectedHost: host})
    this.setState({enableAddHost: false});
  }

  deselectHost() {
    this.setState({selectedHost: null});
  }

  async updateHost(host) {
    // Update host
    let updatedHost = await apiCalls.updateHost(host);
    // Find host in hosts and replace it with updatedHost
    const hosts = this.state.hosts.map(host => {
      return (host === updatedHost._id ? updatedHost : host);
    });
    // Update state
    this.setState({hosts: hosts})
  }

  async deleteHost(host) {
    this.setState({selectedHost: null});
    await apiCalls.removeHost(host._id);
    const hosts = this.state.hosts.filter(r => r._id !== host._id);
    this.setState({hosts: hosts});
  }

  renderHostList() {
    const hosts = this.state.hosts.map((r) => (
      <HostItem
        key={r._id}
        {...r}
        id={r._id}
        onSelect={this.selectHost.bind(this, r)}
      />
    ));
    return (
      <div className="HostList">
        <BackButton onClick={this.props.enableHomeView}></BackButton>
        <h1>Host List</h1>
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
        deselectHost={this.deselectHost}
        updateHost={this.updateHost}
        deleteHost={this.deleteHost.bind(this, this.state.selectedHost)}
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