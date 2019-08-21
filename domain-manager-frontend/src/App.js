import React, { Component } from 'react'
import WebsiteList from './Websites/WebsiteList';
import RegistrarList from './Registrars/RegistrarList';
import HostList from './Hosts/HostList';
import LoginForm from './General/LoginForm';
import './App.css';

var apiCalls = require('./Utils/api');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: 'home',
      websites: [],
      registrars: [],
      hosts: [],
      loggedIn: false
    }
    this.loadWebsites = this.loadWebsites.bind(this);
    this.loadRegistrars = this.loadRegistrars.bind(this);
    this.loadHosts = this.loadHosts.bind(this);
    this.updateWebsites = this.updateWebsites.bind(this);
    this.updateRegistrars = this.updateRegistrars.bind(this);
    this.updateHosts = this.updateHosts.bind(this);
    this.login = this.login.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentWillMount(){
    await this.checkLogin();
    if(this.state.loggedIn) {
      this.setView('home');
    } else {
      this.setView('login');
    }
  }

  async login (user) {
    let foundUser = await apiCalls.login(user);
    if(foundUser && foundUser.username) {
      this.setState({loggedIn: true});
      this.setView('home');
    }
    else {
      this.setState({loggedIn: false});
    }
  }

  async checkLogin() {
    let foundUser = await apiCalls.checkLogin();
    if(foundUser && foundUser.username) {
      this.setState({loggedIn: true});
      return true;
    }
    else {
      this.setState({loggedIn: false});
      return false;
    }
  }

  async logout() {
    apiCalls.logout();
    this.setState({loggedIn: false});
    this.setView('login');
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

  async loadAll() {
    this.checkLogin();
    if(this.state.loggedIn) {
      this.loadWebsites();
      this.loadRegistrars();
      this.loadHosts();
    }
    else {
      this.setView('login');
    }
  }

  async setView(view) {
    if(view === 'home') {
      await this.loadAll();
    }
    this.setState({currentView : view});
  }

  async updateWebsites(websites) {
    this.state.loggedIn ?
      this.setState({websites: websites})
      : this.setView('login');
  }

  async updateRegistrars(registrars) {
    this.state.loggedIn ?
      this.setState({registrars: registrars})
      : this.setView('login');
  }

  async updateHosts(hosts) {
    this.state.loggedIn ?
      this.setState({hosts: hosts})
      : this.setView('login');
  }

  renderHomeView() {
    return (
      <div className="App">
        <button onClick={this.setView.bind(this, 'websites')}>Websites</button>
        <button onClick={this.setView.bind(this, 'registrars')}>Registrars</button>
        <button onClick={this.setView.bind(this, 'hosts')}>Hosts</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }

  renderLoginView() {
    return (
      <div className="App">
        <LoginForm login={this.login}/>
      </div>
    )
  }

  renderWebsiteView() {
    return (
      <div className="App">
        <button onClick={this.setView.bind(this, 'home')}>Home</button>
        <button onClick={this.logout}>Logout</button>
        <h1>Websites</h1>
        <WebsiteList
          back={this.back}
          goBack={this.setView.bind(this, 'home')}
          websites={this.state.websites}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
          updateWebsites={this.updateWebsites}
          checkLogin={this.checkLogin}
        />
      </div>
    )
  }

  renderRegistrarView() {
    return (
      <div className="App">
        <button onClick={this.setView.bind(this, 'home')}>Home</button>
        <button onClick={this.logout}>Logout</button>
        <h1>Domain Name Registrars</h1>
        <RegistrarList 
          goBack={this.setView.bind(this, 'home')}
          websites={this.state.websites}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
          updateRegistrars={this.updateRegistrars}
          updateWebsites={this.updateWebsites}
          checkLogin={this.checkLogin}
        />
      </div>
    )
  }

  renderHostView() {
    return (
      <div className="App">
        <button onClick={this.setView.bind(this, 'home')}>Home</button>
        <button onClick={this.logout}>Logout</button>
        <h1>Website Hosts</h1>
        <HostList 
          goBack={this.setView.bind(this, 'home')}
          websites={this.state.websites}
          registrars={this.state.registrars}
          hosts={this.state.hosts}
          updateHosts={this.updateHosts}
          updateWebsites={this.updateWebsites}
          checkLogin={this.checkLogin}
        />
      </div>
    )
  }

  render() {
    if(this.state.currentView === "login") {
      return this.renderLoginView();
    }
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