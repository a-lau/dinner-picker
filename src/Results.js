import React from 'react'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: props.results};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({results: nextProps.results})
  }

  render() {
    if( !!!this.state.results ) {
      return null
    } else {
    return (
      <div>
        <h2 className="ui center aligned icon header">
	  <i className="circular pie chart icon"></i>
	   Your Dinner: 
        </h2>
        <h1 className="ui center aligned header"> {this.state.results.key} </h1>
      </div>
    );}
  }
}
