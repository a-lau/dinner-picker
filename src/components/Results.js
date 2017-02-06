import React from 'react';
import SelectButton from './SelectButton';

import { connect } from 'react-redux';
import * as foodChoice from '../actions/foodChoiceActions';

function mapState(store) {
  return {
    displayedFood: store.foodChoice.displayedFood,
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonText: "Sounds good", green: false};
    this.resetButton = this.resetButton.bind(this);
    this.updateButton = this.updateButton.bind(this);
  }

  componentWillMount() {
    this.resetButton
  }

  resetButton() {
    this.setState({buttonText: "Sounds good", green: false})
  }

  updateButton(buttonText, green) {
	  console.log("update button")
    this.setState({buttonText: buttonText, green: green})
  }

  render() {
	  console.log("results render")
	  console.log(this.props.displayedFood)
    if( !this.props.displayedFood ) {
      return null
    } else {
      var newDate = new Date(this.props.displayedFood.date).toString().substring(0,16)
    return (
      <div>
        <h2 className="ui center aligned icon header">
	  <i className="circular pie chart icon"></i>
	   Your dinner: 
        </h2>
        <h1 className="ui center aligned header"> {this.props.displayedFood.key} </h1>
	<h5 className="ui center aligned header"> Last had: {newDate} </h5>
	<div className="div_button">
	  <SelectButton resetButton={this.resetButton} buttonText={this.state.buttonText} green={this.state.green} updateButton={this.updateButton} />
	</div>
      </div>
    );}
  }
}

export default connect(mapState)(Results);
