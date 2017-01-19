import React from 'react'

import FoodAPIs from './FoodAPIs'
import FoodList from './FoodList'
import ErrorDisplay from './ErrorDisplay'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateList = this.updateList.bind(this);
      this.dismissDialog = this.dismissDialog.bind(this);
      this.state = {jsonResults: null, selectValue: 10, error: false};
    }
   
    clickAdd(e) { 
      e.preventDefault();
      const newFood = {
        name: this.refs.meal_input.value,
        key: this.refs.meal_input.value,
        date: Date.now(),
        weight: this.state.selectValue
      };
      FoodAPIs.addFood(newFood).then((res) => {
	      console.log(res)
	 if( !res.error ) {
	   this.setState({jsonResults: res, selectValue: 10})
	 } else {
	   this.setState({error: true})
	 }
	 this.refs.meal_input.value = "";
      })
    }

    componentDidMount() {
      FoodAPIs.getList().then(json => {
	this.setState({jsonResults: json})
      }); 
    }

    handleChange(e) {
      this.setState({selectValue:e.target.value});
    }

    handleEvent(e) {
      if( e.keyCode === 13 ) {
	this.clickAdd(e);
      } else if( e.keyCode === 27 ) {
	this.refs.meal_input.value = "";
      }
    }

    updateList(list) {
      this.setState({jsonResults: list})
    }

    dismissDialog(displayError) {
      console.log("in mgr " + displayError)
      this.setState({error: displayError})
    }

    render() {
      return(
	<div>
	  <ErrorDisplay displayError={this.state.error} dismissDialog={this.dismissDialog} />
  	  <div>
	    <FoodList fl={this.state.jsonResults} updateList={this.updateList} />
	  </div>
          <div className="ui divider"></div>
	  <h4 className="ui header">Add an entry</h4>
	    <div className="menu">
	      <div className="ui left input">
                <input onKeyDown={this.handleEvent.bind(this)} type="text" ref="meal_input" name="meal-type" placeholder="Enter a meal choice..."></input>
		<select className="ui dropdown" value={this.state.selectValue} onChange={this.handleChange}>
		  <option value="10">10</option>
		  <option value="9">9</option>
		  <option value="8">8</option>
		  <option value="7">7</option>
		  <option value="6">6</option>
		  <option value="5">5</option>
		  <option value="4">4</option>
		  <option value="3">3</option>
		  <option value="2">2</option>
		  <option value="1">1</option>
		</select>
		<button className="ui button" onClick={this.clickAdd}>Add</button>
              </div> 
            </div>
	</div>
      );

    }
}
