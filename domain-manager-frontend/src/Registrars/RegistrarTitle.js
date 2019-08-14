import React, { Component } from 'react';
import BackButton from '../General/BackButton'

class RegistrarTitle extends Component {

  render() {
    if(!this.props.selectedWebsite) {
      return(
        <div id='registrarTitle'>
          <BackButton onClick={this.props.goBack}></BackButton>
          <h2>Registrar: {this.props.registrarName}</h2>
        </div>
      )
    }
    return(
      <h3>Registrar: {this.props.registrarName}</h3>
    )
  }
}

export default RegistrarTitle;