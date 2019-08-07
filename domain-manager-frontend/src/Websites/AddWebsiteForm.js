import React, {Component} from 'react';
import SelectRegistrarItem from './SelectRegistrarItem';

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
      registrar: ''
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
    // Call addWebsite(), which is passed from WebsiteList as a prop
    this.props.addWebsite(website);
    this.props.disableAddWebsite();
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
      <section id="addWebsiteForm">
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
          >Add Website</button>
        </form>
      </section>
    )
  }
}

export default AddWebsiteForm;