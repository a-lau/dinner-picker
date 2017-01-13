import React from 'react';
import './App.css';
import Picker from './Picker';
import Manager from './Manager';
import Results from './Results';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickFirst=this.clickFirst.bind(this);
    this.clickSecond=this.clickSecond.bind(this);
    this.getResults = this.getResults.bind(this);
    this.state={lastClicked: 'first', results: null};
  }
  
  clickFirst(e) {
    e.preventDefault();
    console.log('The tab was clicked.');
    this.setState({lastClicked: 'first'});
  } 
  clickSecond(e) {
    e.preventDefault();
    console.log('The tab was clicked.');
    this.setState({lastClicked: 'second'});
  }

  getResults(results) {
    this.setState({results: results})
  }
  
  render() {
    const first = (this.state.lastClicked === 'first' ? 'active' : '')
    const second = (this.state.lastClicked === 'second' ? 'active' : '')
    
    return (
      <div>
        <h2 className="ui header">
         <div className="content">
           Dinner Picker 
         </div>
        </h2>
        <div className="ui two column middle aligned very relaxed stackable grid">
	  <div className="column">
	    <div className="ui top attached tabular menu">
              <a className={"item "+first} data-tab="first" onClick={this.clickFirst}>Pick Meal</a>
	      <a className={"item "+second} data-tab="second" onClick={this.clickSecond}>Manage</a>
            </div>
            <div className={"ui bottom attached tab segment "+first} data-tab="first">
              <Picker getResults={this.getResults} />
            </div>
            <div className={"ui bottom attached tab segment "+second} data-tab="second">
  	      <Manager />
            </div>
	  </div>
	  <div className="ui vertical divider"> </div>
	  <div className="center aligned column">
	    <Results results={this.state.results} />
	  </div>
        </div> 
      </div>
    );
  }
}
