import React, { Component } from 'react'

class WebsiteInfo extends Component {

  // constructor(props){
  //   super(props);
  // }

  render() {
    return(
      <div id="websiteInfo">
        <h3>Website Info:</h3>
        <p>
          Website: {this.props.website.name} <br />
          URL: {this.props.website.url} <br />
          FTP: {this.props.website.ftp} <br />
          Username: {this.props.website.userName} <br />
          Password: {this.props.website.password} <br />
          Comments: {this.props.website.comments} <br />
        </p>
      </div>
    )
  }
}

export default WebsiteInfo;