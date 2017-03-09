import React from 'react';
import SelectButton from './SelectButton';

import { connect } from 'react-redux';

function mapState(store) {
  return {
    displayedFood: store.foodChoice.displayedFood,
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {buttonText: "Sounds good", green: false};
    this.updateButton = this.updateButton.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({buttonText: "Sounds good", green: false})
  }

  updateButton(buttonText, green) {
    this.setState({buttonText: buttonText, green: green})
  }

  initialRender() {
    if( this.props.displayedFood.key === undefined ) {
      return null
    } else {
		console.log(this.props)
		var dateCheck = this.props.displayedFood.date
        var lastHad = null
      if(dateCheck.isNaN) {
		lastHad = new Date(dateCheck).toString().substring(0,16)
	  } else {
		lastHad = dateCheck
	  }
      return (
        <div>
          <h5 className="ui center aligned header"> Last had: {lastHad} </h5>
          <div className="div_button">
            <SelectButton resetButton={this.resetButton} buttonText={this.state.buttonText} green={this.state.green} updateButton={this.updateButton} />
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2 className="ui center aligned icon header">
          <i className="circular pie chart icon"></i>
          Your dinner: 
        </h2>
        <h1 className="ui center aligned header"> {this.props.displayedFood.key} </h1>
        {this.initialRender()}
      </div>
    );
  }
}

export default connect(mapState)(Results);
