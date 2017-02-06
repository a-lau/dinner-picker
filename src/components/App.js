import React from 'react';
import './App.css';
import Picker from './Picker';
import Manager from './Manager';
import Results from './Results';
import FoodAPIs from './FoodAPIs';
import EatenList from './EatenList';

import { connect } from 'react-redux';
import { setClickedTab } from '../actions/tabActions';

function mapState(store) {
  return {
    tabClicked: store.tab.tabClicked
  } 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getResults = this.getResults.bind(this);
    this.getPicked = this.getPicked.bind(this);
    this.state={results: null};
  }

  isActiveTab(tabName) {
	return (this.props.tabClicked === tabName ? 'active' : '')
  }

  renderTab() {
    switch (this.props.tabClicked) {
      case "first":
        return (
	  <div className={"ui bottom attached tab segment active"} data-tab="first">
	    <Picker />
	    <Results />
	  </div>
	);
      case "second":
	return (
	  <div className={"ui bottom attached tab segment active"} data-tab="second">
	    <Manager />
	  </div>
	);
      case "third":
	return (
	  <div className={"ui bottom attached tab segment active"} data-tab="third">
	    <EatenList />
	  </div>
	);
      default:
	return null
    }
  }
  
  setTabFocus(tab) {
    this.props.dispatch(setClickedTab(tab))
  } 

  getResults(results) {
    this.setState({results: results})
  }

  getPicked(eatenList) {
    this.setState({eatenList: eatenList})
  }
  
  render() {
    return (
      <div>
        <h1 className="ui header">
         <div className="content">
           Dinner Picker 
         </div>
        </h1>
        <div className="ui top attached tabular menu">
          <a className={"item "+this.isActiveTab("first")} data-tab="first" onClick={ () => this.setTabFocus("first")}>Pick a meal</a>
	  <a className={"item "+this.isActiveTab("second")} data-tab="second" onClick={() => this.setTabFocus("second")}>Manage meals</a>
	  <a className={"item "+this.isActiveTab("third")} data-tab="third" onClick={() => this.setTabFocus("third")}>Eating history</a>
        </div>
	{this.renderTab()}
      </div>
    );
  }
}

export default connect(mapState)(App);
