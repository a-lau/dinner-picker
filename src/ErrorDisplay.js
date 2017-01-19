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
    this.props.dismissDialog(false);
  }

  render() {
    if(this.state.error) {
      return <button onClick={this.dismissDialog} > hi </button>
    } else {
      return null
    }
  }
}
