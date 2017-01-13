import React from 'react'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: props.results};
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
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
	    Results
        </h2>
        <div> {this.state.results.key} </div>
      </div>
    );}
  }
}
