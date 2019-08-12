import React, {Component} from 'react';
import SelectRegistrarItem from './SelectRegistrarItem';
import SelectHostItem from './SelectHostItem';
import TextInput from '../General/TextInput';

class AddWebsiteForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      websiteName: '',
      url: '',
      ftp: '',
      userName: '',
      password: '',
      notes: '',
      registrar: this.props.selectedRegistrar,
      host: this.props.selectedHost
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    // Create website object
    var website = {
        name: this.state.websiteName,
        url: this.state.url,
        ftp: this.state.ftp,
        userName: this.state.userName,
        password: this.state.password,
        notes: this.state.notes
    }
    if(this.state.registrar) {
      website.registrar = this.state.registrar;
    }
    if(this.state.host) {
      website.host = this.state.host;
    }
    // Call addWebsite(), which is passed from WebsiteList as a prop
    if(website.name && website.url) {
      this.props.addWebsite(website);
      this.props.disableAddWebsite();
    }
  }

  render() {
    const registrars = this.props.registrars.map((r) => (
      <SelectRegistrarItem
        key={r._id}
        registrar={r}
        id={r._id}
      />
    ));
    const hosts = this.props.hosts.map((h) => (
      <SelectHostItem
        key={h._id}
        host={h}
        id={h._id}
      />
    ));
    return (
      <section id="websiteAddForm">
        <form id="websiteAddInput">
          <TextInput
            name='websiteName'
            value={this.state.websiteName}
            onChange={this.handleChange}
            placeholder='Website'
          />
          <TextInput
            type='text'
            name='url'
            value={this.state.url}
            onChange={this.handleChange}
            placeholder='URL'
          />
          <TextInput
            type='text'
            name='ftp'
            value={this.state.ftp}
            onChange={this.handleChange}
            placeholder='FTP'
          />
          <TextInput
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Username'
          />
          <TextInput
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password'
          />
          {!this.props.selectedRegistrar ?
            <select
              name='registrar'
              onChange={this.handleChange}
            >
              <option value=''>---Choose a Registrar---</option>
              <option value=''>----------None----------</option>
              {registrars}
            </select>
            : ''
          }
          {!this.props.selectedHost ?
            <select
              name='host'
              onChange={this.handleChange}
            >
              <option value=''>---Choose a Host---</option>
              <option value=''>-------None--------</option>
              {hosts}
            </select>
            : ''
          }
          <textarea
            rows='10'
            name='notes'
            value={this.state.notes}
            onChange={this.handleChange}
            placeholder='Notes...'
          />
          <button 
            onClick={this.handleSubmit}
          >Add Website</button>
        </form>
      </section>
    )
  }
}

export default AddWebsiteForm;