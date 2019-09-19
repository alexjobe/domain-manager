import React, { Component } from 'react'
import WebsiteList from './Websites/WebsiteList';
import RegistrarList from './Registrars/RegistrarList';
import HostList from './Hosts/HostList';
import LoginForm from './General/LoginForm';
import RegisterForm from './General/RegisterForm';
import MaiHeader from './General/MaiHeader';
import './App.css';
import './assets/font-awesome/css/font-awesome.min.css';
import HomeButton from './General/HomeButton';
import LogOutButton from './General/LogOutButton';

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
    this.registerUser = this.registerUser.bind(this);
  }

  async componentWillMount(){
    await this.checkLogin(); // The user may already have a session and be logged in when the page loads
    if(this.state.loggedIn) {
      this.setView('home'); // If the user is logged in, skip the login step
    } else if (await this.checkRegisteredUsers() === true){ // If a registered user exists, show the login form
      this.setView('login');
    } else {
      // If there are no registered users, show the register form. There should only ever be one user,
      // so this step is for first time set up only
      this.setView('registerUser');
    }
  }

  // Register a new user
  async registerUser (user) {
    let newUser = await apiCalls.registerUser(user);
    if(newUser && newUser.username) {
      this.setState({loggedIn: true});
      this.setView('home');
    }
    else {
      this.setState({loggedIn: false});
    }
  }

  // Get the number of registered users. If there are no registered users, return false. Otherwise, return true
  async checkRegisteredUsers () {
    let registeredUsers = await apiCalls.checkRegisteredUsers();
    if(registeredUsers && registeredUsers.count > 0) { return true; }
    return false;
  }

  // Log in the provided user
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

  // Check to see if the user is already logged in. If so, return true. Otherwise, return false.
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

  // Log out the current user
  async logout() {
    apiCalls.logout();
    this.setState({loggedIn: false});
    this.setView('login');
  }

  // Get all websites
  async loadWebsites(){
    let websites = await apiCalls.getWebsites();
    this.setState({websites});
  }

  // Get all registrars
  async loadRegistrars(){
    let registrars = await apiCalls.getRegistrars();
    this.setState({registrars});
  }

  // Get all hosts
  async loadHosts(){
    let hosts = await apiCalls.getHosts();
    this.setState({hosts});
  }

  // Check if user is logged in. If so, get data. Otherwise, display login form.
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

  // Sets the current view
  async setView(view) {
    if(view === 'home') {
      await this.loadAll();
    }
    this.setState({currentView : view});
  }

  // Update websites in state
  async updateWebsites(websites) {
    this.setState({websites: websites});
  }

  // Update registrars in state
  updateRegistrars(registrars) {
    this.setState({registrars: registrars});
  }

  // Update hosts in state
  updateHosts(hosts) {
    this.setState({hosts: hosts});
  }

  renderHomeView() {
    return (
      <div className="App">
        <div className="Navbar">
          <HomeButton onClick={this.setView.bind(this, 'home')} />
          <LogOutButton onClick={this.logout}/>
        </div>
        <MaiHeader />
        <button onClick={this.setView.bind(this, 'websites')}>Websites</button>
        <button onClick={this.setView.bind(this, 'registrars')}>Registrars</button>
        <button onClick={this.setView.bind(this, 'hosts')}>Hosts</button>
      </div>
    )
  }

  renderLoginView() {
    return (
      <div className="App">
        <MaiHeader />
        <LoginForm login={this.login}/>
      </div>
    )
  }

  renderRegisterUserView() {
    return (
      <div className="App">
        <MaiHeader />
        <RegisterForm registerUser={this.registerUser}/>
      </div>
    )
  }

  renderWebsiteView() {
    return (
      <div className="App">
        <div className="Navbar">
          <HomeButton onClick={this.setView.bind(this, 'home')} />
          <LogOutButton onClick={this.logout}/>
        </div>
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
        <div className="Navbar">
          <HomeButton onClick={this.setView.bind(this, 'home')} />
          <LogOutButton onClick={this.logout}/>
        </div>
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
        <div className="Navbar">
          <HomeButton onClick={this.setView.bind(this, 'home')} />
          <LogOutButton onClick={this.logout}/>
        </div>
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
    if(this.state.currentView === "registerUser") {
      return this.renderRegisterUserView();
    }
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