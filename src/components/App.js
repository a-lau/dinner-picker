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
    tabClicked: store.Tab.tabClicked
  } 
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickFirst=this.clickFirst.bind(this);
    this.clickSecond=this.clickSecond.bind(this);
    this.clickThird=this.clickThird.bind(this);
    this.getResults = this.getResults.bind(this);
    this.getPicked = this.getPicked.bind(this);
    this.state={lastClicked: 'first', results: null, eatenList: null};
  }

  componentDidMount() {
    FoodAPIs.getEaten().then(json => {
      var newList = json
      newList.reverse()
      this.setState({eatenList: newList})
    });
  }

  setTabFocus() {
    switch (this.props.tabClicked) {
      case "first":
		return (
		  <div className={"ui bottom attached tab segment active"} data-tab="first">
		    <Picker getResults={this.getResults} />
		    <Results results={this.state.results} getPicked={this.getPicked} />
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
		    <EatenList el={this.state.eatenList} />
		  </div>
	  );
      default:
		return null
    }
  }
  
  clickFirst(e) {
    e.preventDefault();
	this.props.dispatch(setClickedTab("first"))
  } 
  clickSecond(e) {
    e.preventDefault();
	this.props.dispatch(setClickedTab("second"))
  }
  clickThird(e) {
    e.preventDefault();
	this.props.dispatch(setClickedTab("third"))
  }

  getResults(results) {
    this.setState({results: results})
  }

  getPicked(eatenList) {
    this.setState({eatenList: eatenList})
  }
  
  render() {
    const first = (this.props.tabClicked === 'first' ? 'active' : '')
    const second = (this.props.tabClicked === 'second' ? 'active' : '')
    const third = (this.props.tabClicked === 'third' ? 'active' : '')
    
    return (
      <div>
        <h1 className="ui header">
         <div className="content">
           Dinner Picker 
         </div>
        </h1>
        <div className="ui top attached tabular menu">
          <a className={"item "+first} data-tab="first" onClick={this.clickFirst}>Pick a meal</a>
	      <a className={"item "+second} data-tab="second" onClick={this.clickSecond}>Manage meals</a>
	      <a className={"item "+third} data-tab="third" onClick={this.clickThird}>Eating history</a>
        </div>
		{this.setTabFocus()}
      </div>
    );
  }
}

export default connect(mapState)(App);
