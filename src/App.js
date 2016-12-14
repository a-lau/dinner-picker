import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <form className="ui form">
        <div className="field">
          <label>Meal Type</label>
          <input type="text" name="meal-type" placeholder="Enter a meal option"></input>
        </div> 
          <button className="ui button">Submit</button>
      </form>
    );
  }
}

export default App;
