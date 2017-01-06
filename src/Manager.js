import React from 'react'

import FoodAPIs from './FoodAPIs'
import FoodList from './FoodList'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      //this.clickEdit = this.clickEdit.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      //this.state = {jsonResults: null} 
    }
    
    clickAdd(e) {
      e.preventDefault();
      console.log('The add button was clicked.');
	const newFood = {
	  name: this.refs.meal_input.value,
	  key: this.refs.meal_input.value
	};
      FoodAPIs.addFood(newFood).then((res) => {
	 // do some toast message that it got added properly
	 this.setState({jsonResults: res})
      })
	      //.then((res) => { this.state.newData(res) })
    }
    startEdit(props) {
      console.log("Start edit")
    }
    saveEdit(props) {
      console.log('The edit button was clicked.');
      const editFood = {
        key: props 
      };
      FoodAPIs.editFood(editFood).then((res) => {
	this.setState({jsonResults: res})
      })
    }
    clickDelete(props) {
      console.log('The del button was clicked.');
      const delFood = {
        key: props 
      };
      FoodAPIs.delFood(delFood).then((res) => {
	this.setState({jsonResults: res})
      })
    }

    /*componentDidMount() {
      FoodAPIs.getList().then(json => {
	this.setState({jsonResults: json})
      }); 
    }*/

    /*listItems() {
      if (!!!this.state.jsonResults) {
        return <div>Loading...</div>
      } else {
        return (
	  <div className="ui middle aligned selection list">
          {this.state.jsonResults.map(function(item) {
            return( 
              <div className="item" key={item.name}>
	        <div className="right floated content">
		  <i className="edit icon" onClick={() => this.startEdit(item.key)}></i>
		  <i className="trash icon" onClick={() => this.clickDelete(item.key)}></i>
		</div>
                <div className="content">
	          <div className="header">{item.name}</div>
	        </div>
	      </div>
	    )
          }, this)}
	  </div>
        )
      }
    }*/

    render() {
      return(
	<div>
  	  <div>
	    <FoodList />
	  </div>
	  <div className="ui icon simple labeled dropdown button">
	    <i className="plus icon"></i>
	    <span className="text">Add New Item</span>
	    <div className="menu">
	      <div className="header">Input New Item</div>
	      <div className="ui left input">
                <input type="text" ref="meal_input" name="meal-type" placeholder="Enter a meal option..."></input>
		            <button className="ui button" onClick={this.clickAdd}>Add</button>
              </div> 
            </div>
          </div>
        </div>
      );

    }
}
