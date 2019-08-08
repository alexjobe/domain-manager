import React, { Component } from 'react'
import * as apiCalls from '../api';
import RegistrarItem from './RegistrarItem';
import AddRegistrarForm from './AddRegistrarForm';
import RegistrarInfo from './RegistrarInfo';
import BackButton from '../General/BackButton';

class RegistrarList extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedRegistrar: null,
      enableAddRegistrar: false
    }
    this.addRegistrar = this.addRegistrar.bind(this);
    this.enableAddRegistrar = this.enableAddRegistrar.bind(this);
    this.disableAddRegistrar = this.disableAddRegistrar.bind(this);
    this.selectRegistrar = this.selectRegistrar.bind(this);
    this.deselectRegistrar = this.deselectRegistrar.bind(this);
    this.updateRegistrar = this.updateRegistrar.bind(this);
  }

  async addRegistrar(registrar) {
    // Create new registrar and update state
    let newRegistrar = await apiCalls.createRegistrar(registrar);
    this.props.updateRegistrars([...this.props.registrars, newRegistrar]) // ... is the spread operator
  }

  enableAddRegistrar() {
    this.setState({enableAddRegistrar: true});
  }

  disableAddRegistrar() {
    this.setState({enableAddRegistrar: false});
  }

  selectRegistrar(registrar) {
    this.setState({selectedRegistrar: registrar})
    this.setState({enableAddRegistrar: false});
  }

  deselectRegistrar() {
    this.setState({selectedRegistrar: null});
  }

  async updateRegistrar(registrar) {
    // Update registrar
    let updatedReg = await apiCalls.updateRegistrar(registrar);
    // Find registrar in registrars and replace it with updatedReg
    const registrars = this.props.registrars.map(registrar => {
      return (registrar === updatedReg._id ? updatedReg : registrar);
    });
    // Update state
    this.props.updateRegistrars(registrars);
  }

  async deleteRegistrar(registrar) {
    this.setState({selectedRegistrar: null});
    await apiCalls.removeRegistrar(registrar._id);
    const registrars = this.props.registrars.filter(r => r._id !== registrar._id);
    this.props.updateRegistrars(registrars);
  }

  renderRegistrarList() {
    const registrars = this.props.registrars.map((r) => (
      <RegistrarItem
        key={r._id}
        {...r}
        id={r._id}
        onSelect={this.selectRegistrar.bind(this, r)}
      />
    ));
    return (
      <div className="RegistrarList">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h1>Registrar List</h1>
        <ul>
          {registrars}
        </ul>
        <button onClick={this.enableAddRegistrar}>Add Registrar</button>
      </div>
    )
  }

  renderAddRegistrar(){
    return(
      <div id="registrarAddNew">
        <BackButton onClick={this.disableAddRegistrar}></BackButton>
        <h1>New Registrar</h1>
        <AddRegistrarForm 
          addRegistrar={this.addRegistrar} 
          disableAddRegistrar={this.disableAddRegistrar}
        />
      </div>
    )
  }

  renderRegistrarInfo(){
    return (
      <RegistrarInfo 
        registrar={this.state.selectedRegistrar} 
        goBack={this.deselectRegistrar}
        updateRegistrar={this.updateRegistrar}
        deleteRegistrar={this.deleteRegistrar.bind(this, this.state.selectedRegistrar)}
        websites={this.props.websites}
        registrars={this.props.registrars}
        hosts={this.props.hosts}
        updateWebsites={this.props.updateWebsites}
      />
    )
  }

  render() {
    if(this.state.selectedRegistrar !== null){
      return this.renderRegistrarInfo();
    }
    if(this.state.enableAddRegistrar){
      return this.renderAddRegistrar();
    }
    return this.renderRegistrarList();
  }
}

export default RegistrarList;