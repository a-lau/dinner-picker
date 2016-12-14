import React from 'react';
import './App.css';
import Picker from './Picker';
import Manager from './Manager';
import Results from './Results';

export default class App extends React.Component {
  render() {
    return (
      <div className="ui two column middle aligned very relaxed stackable grid">
	<div className="column">
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
	<div className="ui vertical divider"> </div>
	<div className="center aligned column">
	  <Results />
	</div>
      </div> 
    );
  }
}
