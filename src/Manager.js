import React from 'react'

import FoodAPIs from './FoodAPIs'
import FoodList from './FoodList'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateList = this.updateList.bind(this);
      this.state = {jsonResults: null, selectValue: 10};
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
	 // do some toast message that it got added properly
	 this.setState({jsonResults: res})
      })
	      //.then((res) => { this.state.newData(res) })
    }

    componentDidMount() {
      FoodAPIs.getList().then(json => {
	this.setState({jsonResults: json})
      }); 
    }

    handleChange(e) {
      this.setState({selectValue:e.target.value});
    }

    updateList(list) {
      this.setState({jsonResults: list})
    }

    render() {
      return(
	<div>
  	  <div>
	    <FoodList fl={this.state.jsonResults} updateList={this.updateList} />
	  </div>
	  <div className="ui icon simple labeled dropdown button">
	    <i className="plus icon"></i>
	    <span className="text">Add New Item</span>
	    <div className="menu">
	      <div className="header">Input New Item</div>
	      <div className="ui left input">
                <input type="text" ref="meal_input" name="meal-type" placeholder="Enter a meal option..."></input>
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
        </div>
      );

    }
}
