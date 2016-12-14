import React from 'react';
import './App.css';
import Picker from './Picker';
import Manager from './Manager';

export default class App extends React.Component {
  render() {
    return (
      <div>
	<div className="ui top attached tabular menu">
          <a className="item" data-tab="first">Pick Meal</a>

	  <a className="item active" data-tab="second">Manage</a>
 
        </div>
        <div className="ui bottom attached tab segment" data-tab="first">
          <Picker />
        </div>
        <div className="ui bottom attached tab segment active" data-tab="second">
	  <Manager />
        </div>
      </div> 
    );
  }
}
