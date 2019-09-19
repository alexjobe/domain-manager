import React, {Component} from 'react';

class Search extends Component {

  state = {
    searchQuery: ''
  };

  handleChange = async(e) => {
    // [e.target.name] is a computed property name
    await this.setState({ [e.target.name]: e.target.value });
    // Call search(), which is passed to this component as a prop
    this.props.search(this.state.searchQuery);
  }

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit

    // Call search(), which is passed to this component as a prop
    this.props.search(this.state.searchQuery);
  }

  clearSearch = async(e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit

    await this.setState({searchQuery: ''});
    this.props.search(this.state.searchQuery);
  }

  render = () => {
    return (
      <section id="searchForm">
        <form id="searchInput">
          <input
            type='text'
            name='searchQuery'
            value={this.state.searchQuery}
            onChange={this.handleChange}
            placeholder='Search'
          />
          <input type='submit' onClick={this.handleSubmit} style={{display: 'none'}}></input>
        </form>
      </section>
    )
  }
}

export default Search;