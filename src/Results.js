import React from 'react'
import FoodAPIs from './FoodAPIs'
import SelectButton from './SelectButton'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: props.results};
    this.clickAdd = this.clickAdd.bind(this);
    this.getFood = this.getFood.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({results: nextProps.results})
  }

  clickAdd() {
    const food = {
      name: this.state.results.key,
      date: Date.now(),
    }
    FoodAPIs.addEaten(food).then((res) => {
      this.props.getPicked(res)
    })
  }

  getFood(food) {
    FoodAPIs.addEaten(food).then((res) => {
      this.props.getPicked(res)
    })
  }

  render() {
    if( !!!this.state.results ) {
      return null
    } else {
      var newDate = new Date(this.state.results.date).toString().substring(0,16)
    return (
      <div>
        <h2 className="ui center aligned icon header">
	  <i className="circular pie chart icon"></i>
	   Your dinner: 
        </h2>
        <h1 className="ui center aligned header"> {this.state.results.key} </h1>
	<h5 className="ui center aligned header"> Last had: {newDate} </h5>
	<div className="div_button">
	  <SelectButton selected={this.state.results.key} getFood={this.getFood} />
	</div>
      </div>
    );}
  }
}
