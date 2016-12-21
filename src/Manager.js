import React from 'react'

import FoodList from './FoodList'
import data from './data.json'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.clickEdit = this.clickEdit.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      this.state = { foodData: data }
    }
    
    clickAdd(e) {
      e.preventDefault();
      console.log('The add button was clicked.');
      FoodList.addFood().then(json => {
        console.log(json);
      });
    }
    clickEdit(e) {
      e.preventDefault();
      console.log('The edit button was clicked.');
      FoodList.getList().then(json => {
	console.log(json);
      });
    }
    clickDelete(e) {
      e.preventDefault();
      console.log('The del button was clicked.');
      FoodList.delFood().then(json => {
        console.log(json);
      });
    }
    listItems() {
	console.log("hello?")
	console.log( this.state.foodData )
      return (
	<div className="item">
	  <div className="content">
	    {this.state.foodData.map(function(item) {
              return <div className="header" key={item.name}>{item.name}</div>
            })}
  	  </div>
	</div>
      )
    }
    render() {
      console.log( this.state.foodData )
      return(
	<div>
  	  <div className="ui middle aligned selection list">
	    {this.listItems()}
	  </div>
	  <form className="ui form">
            <div className="field">
              <label>Meal Type</label>
              <input type="text" name="meal-type" placeholder="Enter a meal option"></input>
            </div> 
            <button className="ui button" onClick={this.clickAdd}>Add New Item</button>
            <button className="ui button" onClick={this.clickEdit}>Edit</button>
	    <button className="ui button" onClick={this.clickDelete}>Delete Item</button>
          </form>
        </div>
      );
    }
}
