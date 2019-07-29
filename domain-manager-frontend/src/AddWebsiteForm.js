import React, {Component} from 'react';

class AddWebsiteForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      websiteName: '',
      url: '',
      ftp: '',
      userName: '',
      password: '',
      comments: ''

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
        comments: this.state.comments
    }
    // Call addWebsite(), which is passed from WebsiteList as a prop
    this.props.addWebsite(website);
  }

  render() {
    return (
      <section id="addWebsiteForm">
        <form id="websiteInput">
          <input
            name='websiteName'
            value={this.state.websiteName}
            onChange={this.handleChange}
            placeholder='Website'
          />
          <input
            name='url'
            value={this.state.url}
            onChange={this.handleChange}
            placeholder='URL'
          />
          <input
            name='ftp'
            value={this.state.ftp}
            onChange={this.handleChange}
            placeholder='FTP'
          />
          <input
            name='userName'
            value={this.state.userName}
            onChange={this.handleChange}
            placeholder='Username'
          />
          <input
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password'
          />
          <input
            name='comments'
            value={this.state.comments}
            onChange={this.handleChange}
            placeholder='Comments'
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