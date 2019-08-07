import React, { Component } from 'react';
import BackButton from '../General/BackButton';
import EditHostForm from './EditHostForm';

class HostInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      enableEditMode: false
    }
    this.enableEditMode = this.enableEditMode.bind(this);
    this.disableEditMode = this.disableEditMode.bind(this);
  }

  enableEditMode() {
    this.setState({enableEditMode: true});
  }

  disableEditMode() {
    this.setState({enableEditMode: false});
  }

  renderHostInfo() {
    return(
      <div id="hostInfoDisplay">
        <BackButton onClick={this.props.deselectHost}></BackButton>
        <h1>Host Info:</h1>
        <p>
          Host: {this.props.host.name} <br />
          Username: {this.props.host.userName} <br />
          Password: {this.props.host.password} <br />
        </p>
        Notes:
        <textarea
          rows='10'
          name='notes'
          value={this.props.host.notes}
          placeholder='Notes...'
          readOnly
          disabled
        />
        <button onClick={this.enableEditMode}>Edit Host</button>
        <button onClick={this.props.deleteHost}>Delete Host</button>
      </div>
    )
  }

  renderHostEdit () {
    return (
      <div id="hostEdit">
        <BackButton onClick={this.disableEditMode}></BackButton>
        <h1>Edit Host</h1>
        <EditHostForm 
          host={this.props.host} 
          updateHost={this.props.updateHost} 
          disableEditMode={this.disableEditMode}
        />
      </div>
    )
  }

  render() {
    return(
      <div id='hostInfo'>
        {
          this.state.enableEditMode ?
            this.renderHostEdit()
          : this.renderHostInfo()
        }
      </div>
    )
  }
}

export default HostInfo;