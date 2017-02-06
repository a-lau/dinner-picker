import React from 'react';

import { connect } from 'react-redux';
import { clearError } from '../actions/selectionListActions'; 

function mapState(store) {
  return {}
}

class ErrorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: props.displayError};
    this.dismissDialog = this.dismissDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({error: nextProps.displayError})
  }

  dismissDialog() {
    this.setState({error: false})
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

export default connect(mapState)(ErrorDisplay);
