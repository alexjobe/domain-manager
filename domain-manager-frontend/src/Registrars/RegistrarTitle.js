import React, { Component } from 'react';
import Title from '../General/Title';

class RegistrarTitle extends Component {

  render() {
    if(!this.props.selectedWebsite) {
      return(
        <Title titleString={"Registrar: " + this.props.registrarName} onBack={this.props.goBack}/>
      )
    }
    return(
      <h3>{this.props.registrarName}</h3>
    )
  }
}

export default RegistrarTitle;