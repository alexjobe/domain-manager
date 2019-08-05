import React, { Component } from 'react'
import WebsiteList from './Websites/WebsiteList';
import RegistrarList from './Registrars/RegistrarList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentView: 'home'
    }
    this.enableHomeView = this.enableHomeView.bind(this);
    this.enableWebsiteView = this.enableWebsiteView.bind(this);
    this.enableRegistrarView = this.enableRegistrarView.bind(this);
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

  renderHomeView() {
    return (
      <div id='homeView'>
        <button onClick={this.enableWebsiteView}>Websites</button>
        <button onClick={this.enableRegistrarView}>Registrars</button>
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
      </div>
    )
  }
}

export default App