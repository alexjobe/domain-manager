import React, { Component } from 'react'
import * as apiCalls from './api';
import WebsiteList from './Websites/WebsiteList';
import RegistrarList from './Registrars/RegistrarList';
import HostList from './Hosts/HostList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: 'home',
      websites: [],
      registrars: [],
      hosts: [],
    }
    this.loadWebsites = this.loadWebsites.bind(this);
    this.loadRegistrars = this.loadRegistrars.bind(this);
    this.loadHosts = this.loadHosts.bind(this);
    this.enableHomeView = this.enableHomeView.bind(this);
    this.enableWebsiteView = this.enableWebsiteView.bind(this);
    this.enableRegistrarView = this.enableRegistrarView.bind(this);
    this.enableHostView = this.enableHostView.bind(this);
    this.updateWebsites = this.updateWebsites.bind(this);
    this.updateRegistrars = this.updateRegistrars.bind(this);
    this.updateHosts = this.updateHosts.bind(this);
  }

  componentWillMount(){
    this.loadAll();
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

  loadAll() {
    this.loadWebsites();
    this.loadRegistrars();
    this.loadHosts();
  }

  enableHomeView() {
    this.loadAll();
    this.setState({currentView: 'home'});
  }

  enableWebsiteView() {
    this.setState({currentView: 'websites'});
  }

  enableRegistrarView() {
    this.setState({currentView: 'registrars'});
  }

  enableHostView() {
    this.setState({currentView: 'hosts'});
  }

  updateWebsites(websites) {
    this.setState({websites: websites});
  }

  updateRegistrars(registrars) {
    this.setState({registrars: registrars});
  }

  updateHosts(hosts) {
    this.setState({hosts: hosts});
  }

  renderHomeView() {
    return(
      <div className="App">
        <button onClick={this.enableWebsiteView}>Websites</button>
        <button onClick={this.enableRegistrarView}>Registrars</button>
        <button onClick={this.enableHostView}>Hosts</button>
      </div>
    )
  }

  renderWebsiteView() {
    return(
      <div className="App">
        <button onClick={this.enableHomeView}>Home</button>
        <h1>Websites</h1>
        <WebsiteList
          back={this.back}
          goBack={this.enableHomeView}
          websites={this.state.websites}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
          updateWebsites={this.updateWebsites}
        />
      </div>
    )
  }

  renderRegistrarView() {
    return(
      <div className="App">
        <button onClick={this.enableHomeView}>Home</button>
        <h1>Domain Name Registrars</h1>
        <RegistrarList 
          goBack={this.enableHomeView}
          websites={this.state.websites}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
          updateRegistrars={this.updateRegistrars}
          updateWebsites={this.updateWebsites}
        />
      </div>
    )
  }

  renderHostView() {
    return(
      <div className="App">
        <button onClick={this.enableHomeView}>Home</button>
        <h1>Website Hosts</h1>
        <HostList 
          goBack={this.enableHomeView}
          websites={this.state.websites}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
          updateHosts={this.updateHosts}
          updateWebsites={this.updateWebsites}
        />
      </div>
    )
  }

  render() {
    if(this.state.currentView === "websites") {
      return this.renderWebsiteView();
    }
    if(this.state.currentView === "registrars") {
      return this.renderRegistrarView();
    }
    if(this.state.currentView === "hosts") {
      return this.renderHostView();
    }
    return this.renderHomeView();
  }
}

export default App