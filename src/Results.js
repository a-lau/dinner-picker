import React from 'react'
import FoodAPIs from './FoodAPIs'
import SelectButton from './SelectButton'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: props.results, buttonText: "Sounds good", green: false};
    this.getFood = this.getFood.bind(this);
    this.updateButton = this.updateButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({results: nextProps.results})

  }

  getFood(food) {
    FoodAPIs.addEaten(food).then((res) => {
      this.props.getPicked(res)
    })
    console.log("get Food")
    this.setState({buttonText: "Sounds good", green: false})
  }

  updateButton(buttonText, green) {
	  console.log("update button")
    this.setState({buttonText: buttonText, green: green})
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
	  <SelectButton selected={this.state.results.key} getFood={this.getFood}
	                buttonText={this.state.buttonText} green={this.state.green} updateButton={this.updateButton} />
	</div>
      </div>
    );}
  }
}
