import React from 'react'

export default class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
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
          <button className="ui button" onClick={this.handleClick}>Submit</button>
      </form>
      );
    }
}
