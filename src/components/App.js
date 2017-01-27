import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Picker from './Picker';
import Manager from './Manager';
import Results from './Results';
import FoodAPIs from './FoodAPIs';
import EatenList from './EatenList';

function mapState(store) {
  return {
    tab: store.Form.tab
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
  
  clickFirst(e) {
    e.preventDefault();
    this.setState({lastClicked: 'first'});
  } 
  clickSecond(e) {
    e.preventDefault();
    this.setState({lastClicked: 'second'});
  }
  clickThird(e) {
    e.preventDefault();
    this.setState({lastClicked: 'third'});
  }

  getResults(results) {
    this.setState({results: results})
  }

  getPicked(eatenList) {
    this.setState({eatenList: eatenList})
  }
  
  render() {
    const first = (this.props.tab === 'first' ? 'active' : '')
    const second = (this.state.lastClicked === 'second' ? 'active' : '')
    const third = (this.state.lastClicked === 'third' ? 'active' : '')
    console.log(this.props.tab)
    
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
        <div className={"ui bottom attached tab segment "+first} data-tab="first">
          <Picker getResults={this.getResults} />
	  <Results results={this.state.results} getPicked={this.getPicked} />
        </div>
        <div className={"ui bottom attached tab segment "+second} data-tab="second">
  	  <Manager />
        </div>
        <div className={"ui bottom attached tab segment "+third} data-tab="third">
	  <EatenList el={this.state.eatenList} />
	</div>
      </div>
    );
  }
}

export default connect(mapState)(App);
