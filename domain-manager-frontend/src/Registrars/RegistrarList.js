import React, { Component } from 'react'
import RegistrarListItem from './RegistrarListItem';
import AddRegistrarForm from './AddRegistrarForm';
import RegistrarInfo from './RegistrarInfo';
import Search from '../General/Search';
import Title from '../General/Title';

var apiCalls = require('../Utils/api');

class RegistrarList extends Component {

  state = {
    selectedRegistrar: null,
    enableAddRegistrar: false
  }

  static defaultProps = {
    websites: [],
    registrars: [],
    hosts: []
  };

  addRegistrar = async(registrar) => {
    if(this.props.checkLogin()) {
      // Create new registrar and update state
      let newRegistrar = await apiCalls.createRegistrar(registrar);
      this.props.updateRegistrars([...this.props.registrars, newRegistrar]) // ... is the spread operator
    }
  }

  enableState = (state, isEnabled) => {
    this.setState({[state] : isEnabled}); // [state] is a computed property name
    this.searchRegistrars(''); // Clear search results when changing view
  }

  selectRegistrar = (registrar) => {
    this.setState({selectedRegistrar: {...registrar}})
    this.setState({enableAddRegistrar: false});
    this.searchRegistrars(''); // Clear search results when changing view
  }

  deselectRegistrar = () => {
    this.setState({selectedRegistrar: null});
  }

  updateRegistrar = async(registrar) => {
    if(this.props.checkLogin()) {
      // Update registrar
      let updatedReg = await apiCalls.updateRegistrar(registrar);
      // Find registrar in registrars and replace it with updatedReg
      const registrars = this.props.registrars.map(registrar => {
        return (registrar._id === updatedReg._id ? updatedReg : registrar);
      });
      // Update state
      this.setState({selectedRegistrar: {...updatedReg}});
      this.props.updateRegistrars(registrars);
    }
  }

  deleteRegistrar = async(registrar) => {
    if(this.props.checkLogin()) {
      this.setState({selectedRegistrar: null});
      await apiCalls.removeRegistrar(registrar._id);
      const registrars = this.props.registrars.filter(r => r._id !== registrar._id);
      this.props.updateRegistrars(registrars);
    }
  }

  searchRegistrars = async(query) => {
    if(this.props.checkLogin()) {
      if(query !== '') {
        let matchingRegistrars = await apiCalls.searchRegistrars(query);
        this.props.updateRegistrars(matchingRegistrars);
      } else {
        let allRegistrars = await apiCalls.getRegistrars();
        this.props.updateRegistrars(allRegistrars);
      }
    }
  }

  renderRegistrarList = () => {
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
        <Title titleString="All Registrars" onBack={this.props.goBack}/>
        <Search search={this.searchRegistrars}></Search>
        <ul>
          {registrarListItems}
        </ul>
        <button onClick={this.enableState.bind(this, 'enableAddRegistrar', true)}>Add Registrar</button>
      </div>
    )
  }

  renderAddRegistrar = () => {
    return(
      <div id="registrarAddNew">
        <Title titleString="New Registrar" onBack={this.enableState.bind(this, 'enableAddRegistrar', false)}/>
        <AddRegistrarForm 
          addRegistrar={this.addRegistrar} 
          disableAddRegistrar={this.enableState.bind(this, 'enableAddRegistrar', false)}
        />
      </div>
    )
  }

  renderRegistrarInfo = () => {
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
        checkLogin={this.props.checkLogin}
      />
    )
  }

  render = () => {
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