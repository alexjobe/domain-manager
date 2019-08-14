import React, { Component } from 'react'
import * as apiCalls from '../api';
import RegistrarListItem from './RegistrarListItem';
import AddRegistrarForm from './AddRegistrarForm';
import RegistrarInfo from './RegistrarInfo';
import BackButton from '../General/BackButton';
import Search from '../General/Search';

class RegistrarList extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedRegistrar: null,
      enableAddRegistrar: false
    }
    this.addRegistrar = this.addRegistrar.bind(this);
    this.selectRegistrar = this.selectRegistrar.bind(this);
    this.deselectRegistrar = this.deselectRegistrar.bind(this);
    this.updateRegistrar = this.updateRegistrar.bind(this);
    this.searchRegistrars = this.searchRegistrars.bind(this);
  }

  async addRegistrar(registrar) {
    // Create new registrar and update state
    let newRegistrar = await apiCalls.createRegistrar(registrar);
    this.props.updateRegistrars([...this.props.registrars, newRegistrar]) // ... is the spread operator
  }

  enableState(state, isEnabled) {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
    this.searchRegistrars(''); // Clear search results when changing view
  }

  selectRegistrar(registrar) {
    this.setState({selectedRegistrar: registrar})
    this.setState({enableAddRegistrar: false});
    this.searchRegistrars(''); // Clear search results when changing view
  }

  deselectRegistrar() {
    this.setState({selectedRegistrar: null});
  }

  async updateRegistrar(registrar) {
    // Update registrar
    let updatedReg = await apiCalls.updateRegistrar(registrar);
    // Find registrar in registrars and replace it with updatedReg
    const registrars = this.props.registrars.map(registrar => {
      return (registrar._id === updatedReg._id ? updatedReg : registrar);
    });
    // Update state
    if(this.state.selectedRegistrar._id === updatedReg._id){
      this.setState({selectedRegistrar: updatedReg});
    }
    this.props.updateRegistrars(registrars);
  }

  async deleteRegistrar(registrar) {
    this.setState({selectedRegistrar: null});
    await apiCalls.removeRegistrar(registrar._id);
    const registrars = this.props.registrars.filter(r => r._id !== registrar._id);
    this.props.updateRegistrars(registrars);
  }

  async searchRegistrars(query) {
    if(query !== '') {
      let matchingRegistrars = await apiCalls.searchRegistrars(query);
      this.props.updateRegistrars(matchingRegistrars);
    } else {
      let allRegistrars = await apiCalls.getRegistrars();
      this.props.updateRegistrars(allRegistrars);
    }
  }

  renderRegistrarList() {
    const registrarListItems = this.props.registrars.map((r) => (
      <RegistrarListItem
        key={r._id}
        {...r}
        id={r._id}
        onSelect={this.selectRegistrar.bind(this, r)}
      />
    ));
    return (
      <div className="RegistrarList">
        <BackButton onClick={this.props.goBack}></BackButton>
        <h2>All Registrars</h2>
        <Search search={this.searchRegistrars}></Search>
        <ul>
          {registrarListItems}
        </ul>
        <button onClick={this.enableState.bind(this, 'enableAddRegistrar', true)}>Add Registrar</button>
      </div>
    )
  }

  renderAddRegistrar(){
    return(
      <div id="registrarAddNew">
        <BackButton onClick={this.enableState.bind(this, 'enableAddRegistrar', false)}></BackButton>
        <h2>New Registrar</h2>
        <AddRegistrarForm 
          addRegistrar={this.addRegistrar} 
          disableAddRegistrar={this.enableState.bind(this, 'enableAddRegistrar', false)}
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