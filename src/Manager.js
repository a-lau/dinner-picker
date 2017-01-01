import React from 'react'

import FoodList from './FoodList'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.clickEdit = this.clickEdit.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      this.state = {jsonResults: null}
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
      FoodList.editFood().then(json => {
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

    componentDidMount() {
      console.log("mount?")
      FoodList.getList().then(json => {
	const jsonResults = json
	this.setState(jsonResults: jsonResults)
        console.log("inside response")
        console.log(jsonResults)
      }); 
    }

    listItems() {
	    console.log(this.state.jsonResults)
      if (!!!this.state.jsonResults) {
	console.log("should be here")
        return <div>Loading...</div>
      } else {
	      console.log("why we here?")
        return (
	  <div className="ui middle aligned selection list">
          {this.state.jsonResults.map(function(item) {
            return( 
              <div className="item" key={item.name}>
                <div className="content">
	          <div className="header">{item.name}</div>
	        </div>
	      </div>
	    )
          })}
	  </div>
        )
      }
    }

    render() {
      return(
	<div>
  	  <div>
	    {this.listItems()}
	  </div>
	  <div className="ui icon simple labeled dropdown button">
	    <i className="plus icon"></i>
	    <span className="text">Add New Item</span>
	    <div className="menu">
	      <div className="header">Input New Item</div>
	      <div className="ui left input">
                <input type="text" name="meal-type" placeholder="Enter a meal option..."></input>
		<button className="ui button" onClick={this.clickAdd}>Add</button>
              </div> 
            </div>
          </div>
          <button className="ui button" onClick={this.clickEdit}>Edit</button>
	  <button className="ui button" onClick={this.clickDelete}>Delete Item</button>
        </div>
      );

    }
}
