import React, { Component } from 'react';
import Title from '../General/Title';

class HostTitle extends Component {
  render = () => {
    if(!this.props.selectedWebsite) {
      return(
        <Title titleString={"Host: " + this.props.hostName} onBack={this.props.goBack}/>
      )
    }
    return(
      <h3>{this.props.hostName}</h3>
    )
  }
}

export default HostTitle;