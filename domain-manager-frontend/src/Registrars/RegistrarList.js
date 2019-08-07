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
      registrars: [],
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

  componentWillMount(){
    this.loadRegistrars();
  }

  async loadRegistrars(){
    let registrars = await apiCalls.getRegistrars();
    this.setState({registrars});
  }

  async addRegistrar(registrar) {
    // Create new registrar and update state
    let newReg = await apiCalls.createRegistrar(registrar);
    this.setState({registrars: [...this.state.registrars, newReg]}) // ... is the spread operator
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
    const registrars = this.state.registrars.map(registrar => {
      return (registrar === updatedReg._id ? updatedReg : registrar);
    });
    // Update state
    this.setState({registrars: registrars})
  }

  async deleteRegistrar(registrar) {
    this.setState({selectedRegistrar: null});
    await apiCalls.removeRegistrar(registrar._id);
    const registrars = this.state.registrars.filter(r => r._id !== registrar._id);
    this.setState({registrars: registrars});
  }

  renderRegistrarList() {
    const registrars = this.state.registrars.map((r) => (
      <RegistrarItem
        key={r._id}
        {...r}
        id={r._id}
        onSelect={this.selectRegistrar.bind(this, r)}
      />
    ));
    return (
      <div className="RegistrarList">
        <BackButton onClick={this.props.enableHomeView}></BackButton>
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
      <AddRegistrarForm 
        addRegistrar={this.addRegistrar} 
        disableAddRegistrar={this.disableAddRegistrar}
      />
    )
  }

  renderRegistrarInfo(){
    return (
      <RegistrarInfo 
        registrar={this.state.selectedRegistrar} 
        deselectRegistrar={this.deselectRegistrar}
        updateRegistrar={this.updateRegistrar}
        deleteRegistrar={this.deleteRegistrar.bind(this, this.state.selectedRegistrar)}
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