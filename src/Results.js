import React from 'react'
import FoodAPIs from './FoodAPIs'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: props.results};
    this.clickAdd = this.clickAdd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({results: nextProps.results})
  }

  clickAdd() {
    const food = {
      name: this.state.results.key,
      date: Date.now(),
      key: this.state.results.key
    }
    FoodAPIs.addEaten(food).then((res) => {
      this.props.getPicked(res)
    })
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
	<div className="button_format">
	  <button className="ui green basic icon button" onClick={this.clickAdd} >
            <i className="checkmark icon"></i>
	  </button>
	  <button className="ui red basic icon button">
	    <i className="refresh icon"></i>
	  </button>
	</div>
      </div>
    );}
  }
}
