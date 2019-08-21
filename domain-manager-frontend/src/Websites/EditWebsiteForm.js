import React, {Component} from 'react';
import SelectRegistrarItem from './SelectRegistrarItem';
import SelectHostItem from './SelectHostItem';
import TextInput from '../General/TextInput';

class EditWebsiteForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      websiteName: this.props.website.name,
      url: this.props.website.url,
      ftp: this.props.website.ftp,
      userName: this.props.website.userName,
      password: this.props.website.password,
      notes: this.props.website.notes,
      registrar: this.props.website.registrar,
      host: this.props.website.host
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Called whenever the user presses a key in the input field
  handleChange(e){
    // [e.target.name] is a computed property name
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault(); // Prevent form from reloading the page on submit
    if(this.state.websiteName && this.state.url){
      // Create updated website object
      var updatedWebsite = this.props.website;
      updatedWebsite.name = this.state.websiteName;
      updatedWebsite.url = this.state.url;
      updatedWebsite.ftp = this.state.ftp;
      updatedWebsite.userName = this.state.userName;
      updatedWebsite.password = this.state.password;
      updatedWebsite.notes = this.state.notes;
      updatedWebsite.registrar = this.state.registrar;
      updatedWebsite.host = this.state.host;

      // ObjectIDs cannot be empty strings, but they can be null
      if(updatedWebsite.registrar === ''){updatedWebsite.registrar = null}
      if(updatedWebsite.host === ''){updatedWebsite.host = null}

      // Call updateWebsite(), which is passed from WebsiteList as a prop
      this.props.updateWebsite(updatedWebsite);
      this.props.disableEditMode();
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
      <section id="websiteEditForm">
        <form id="websiteEditInput">
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
          <select
            name='registrar'
            onChange={this.handleChange}
          >
            {this.props.website.registrar ? 
              <option value={this.props.website.registrar._id}>Current Registrar: {this.props.website.registrar.name}</option>
            : <option value=''>---Choose a Registrar---</option>
            }
            <option value=''>----------None----------</option>
            {registrars}
          </select>
          <select
            name='host'
            onChange={this.handleChange}
          >
            {this.props.website.host ? 
              <option value={this.props.website.host._id}>Current Host: {this.props.website.host.name}</option>
            : <option value=''>---Choose a Host---</option>
            }
            <option value=''>-------None--------</option>
            {hosts}
          </select>
          <textarea
            rows='10'
            name='notes'
            value={this.state.notes}
            onChange={this.handleChange}
            placeholder='Notes...'
          />
          <button 
            onClick={this.handleSubmit}
          >Update Website</button>
        </form>
      </section>
    )
  }
}

export default EditWebsiteForm;