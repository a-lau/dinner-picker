import React from 'react'

export default class ErrorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: props.displayError};
    this.dismissDialog = this.dismissDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({error: nextProps.displayError})
  }

  dismissDialog() {
    this.props.toggleErrorDialog(false);
  }

  render() {
    if(this.state.error) {
      return (
        <div className="ui warning message">
	  <i className="close icon" onClick={this.dismissDialog}></i>
	  <div className="header">
	    Action failed! Duplicate entry exists.
	   </div>
	</div>
    )} else {
      return null
    }
  }
}
