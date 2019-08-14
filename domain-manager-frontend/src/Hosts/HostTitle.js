import React, { Component } from 'react';
import BackButton from '../General/BackButton'

class HostTitle extends Component {

  render() {
    if(!this.props.selectedWebsite) {
      return(
        <div id='hostTitle'>
          <BackButton onClick={this.props.goBack}></BackButton>
          <h2>Host: {this.props.hostName}</h2>
        </div>
      )
    }
    return(
      <h3>Host: {this.props.hostName}</h3>
    )
  }
}

export default HostTitle;