import React, { Component } from 'react';

class CopyableText extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasFocus: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.textArea = React.createRef();
  }

  handleBlur() {
    // The onBlur DOM event occurs when an object loses focus
    this.setState({hasFocus: false});
    this.textArea.current.value = this.props.value;
  }

  handleFocus() {
    // The onFocus DOM event occurs when an object has focus
    this.setState({hasFocus: true});
  }

  // Copies the input field's value to clipboard
  copyToClipboard(e) {
    this.textArea.current.select();
    document.execCommand('copy');
    e.target.focus();
    this.textArea.current.value = 'Copied to Clipboard!';
  }

  render() {
    return(
      <input
        ref={this.textArea}
        //rows='1'
        type='text'
        value={this.props.value}
        onClick={this.copyToClipboard}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        readOnly
      />
    )
  }

}
export default CopyableText;