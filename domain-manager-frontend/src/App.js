import React, { Component } from 'react'
import WebsiteList from './Websites/WebsiteList';
import RegistrarList from './Registrars/RegistrarList';
import HostList from './Hosts/HostList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: 'home'
    }
    this.enableHomeView = this.enableHomeView.bind(this);
    this.enableWebsiteView = this.enableWebsiteView.bind(this);
    this.enableRegistrarView = this.enableRegistrarView.bind(this);
    this.enableHostView = this.enableHostView.bind(this);
  }

  enableHomeView() {
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

  renderHomeView() {
    return (
      <div id='homeView'>
        <button onClick={this.enableWebsiteView}>Websites</button>
        <button onClick={this.enableRegistrarView}>Registrars</button>
        <button onClick={this.enableHostView}>Hosts</button>
      </div>
    )
  }

  render() {
    if(this.state.currentView === 'home') {
      return this.renderHomeView();
    }
    return (
      <div className="App">
        {
          this.state.currentView === 'websites' ?
            <WebsiteList enableHomeView={this.enableHomeView}/>
          : ''
        }
        {
          this.state.currentView === 'registrars' ?
            <RegistrarList enableHomeView={this.enableHomeView}/>
          : ''
        }
        {
          this.state.currentView === 'hosts' ?
            <HostList enableHomeView={this.enableHomeView}/>
          : ''
        }
      </div>
    )
  }
}

export default App