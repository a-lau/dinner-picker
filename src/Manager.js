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
      //console.log(this.refs.meal_input.value);
      console.log('The add button was clicked.');
	const newFood = {
	  name: 'Pizza',
	  key: 'Pizza'
	};
      FoodList.addFood(newFood).then((res) => {
	 console.log(res)
	 // do some toast message that it got added properly
	 this.setState({jsonResults: res})
      })
	      //.then((res) => { this.state.newData(res) })
    }
    clickEdit(e) {
      e.preventDefault();
      console.log('The edit button was clicked.');
      const editFood = {
        name: 'Pizza',
        key: 'Pizza'
      };
      FoodList.editFood(editFood)
    }
    clickDelete(e) {
      e.preventDefault();
      console.log('The del button was clicked.');
      const delFood = {
        name: 'Pizza',
        key: 'Pizza'
      };
      FoodList.delFood(delFood).then((res) => {
        console.log(res)
	this.setState({jsonResults: res})
      })
    }

    componentDidMount() {
      FoodList.getList().then(json => {
	this.setState({jsonResults: json})
      }); 
    }

    listItems() {
      if (!!!this.state.jsonResults) {
        return <div>Loading...</div>
      } else {
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
                <input type="text" ref="meal_input" name="meal-type" placeholder="Enter a meal option..."></input>
		            <button className="ui button" onClick={this.clickAdd}>Add</button>
              </div> 
            </div>
          </div>
          <button className="ui button" onClick={this.clickEdit}>Edit</button>
	  <button className="ui button" onClick={this.clickDelete}>Delete Item</button>
        </div>
      );

    }
    // will need to do something with ref for callback for add:  ref={(input) => { this.textInput = input; }}
    // https://facebook.github.io/react/docs/refs-and-the-dom.html
}
