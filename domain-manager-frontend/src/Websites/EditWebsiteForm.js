import React, {Component} from 'react';
import SelectRegistrarItem from './SelectRegistrarItem';

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
      registrar: this.props.website.registrar

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
    // Create updated website object
    var updatedWebsite = this.props.website;
    updatedWebsite.name = this.state.websiteName;
    updatedWebsite.url = this.state.url;
    updatedWebsite.ftp = this.state.ftp;
    updatedWebsite.userName = this.state.userName;
    updatedWebsite.password = this.state.password;
    updatedWebsite.notes = this.state.notes;
    updatedWebsite.registrar = this.state.registrar;


    // Call updateWebsite(), which is passed from WebsiteList as a prop
    this.props.updateWebsite(updatedWebsite);
    this.props.disableEditMode();
  }

  render() {
    const registrars = this.props.registrars.map((r) => (
      <SelectRegistrarItem
        key={r._id}
        registrar={r}
        id={r._id}
      />
    ));
    return (
      <section id="editWebsiteForm">
        <form id="websiteInput">
          <input
            type='text'
            name='websiteName'
            value={this.state.websiteName}
            onChange={this.handleChange}
            placeholder='Website'
          />
          <input
            type='text'
            name='url'
            value={this.state.url}
            onChange={this.handleChange}
            placeholder='URL'
          />
          <input
            type='text'
            name='ftp'
            value={this.state.ftp}
            onChange={this.handleChange}
            placeholder='FTP'
          />
          <input
            type='text'
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Username'
          />
          <input
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
            <option value=''>---Choose a Registrar---</option>
            <option value=''>----------None----------</option>
            {registrars}
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