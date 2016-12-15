import React from 'react'

import FoodList from './FoodList'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd= this.clickAdd.bind(this);
      this.clickEdit= this.clickEdit.bind(this);
      this.clickDelete= this.clickDelete.bind(this);
    }
    
    clickAdd(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
    clickEdit(e) {
      e.preventDefault();
      console.log('The button was clicked.');
      FoodList.getList().then(json => {
	console.log(json);
      });
    }
    clickDelete(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
    render() {
      return(
	<form className="ui form">
        <div className="field">
          <label>Meal Type</label>
          <input type="text" name="meal-type" placeholder="Enter a meal option"></input>
        </div> 
          <button className="ui button" onClick={this.clickAdd}>Add New Item</button>
          <button className="ui button" onClick={this.clickEdit}>Edit</button>
	  <button className="ui button" onClick={this.clickDelete}>Delete Item</button>
      </form>
      );
    }
}
