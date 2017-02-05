import React from 'react'

import FoodAPIs from './FoodAPIs'
import FoodList from './FoodList'
import ErrorDisplay from './ErrorDisplay'

import { connect } from 'react-redux';
import * as slist from '../actions/selectionListActions';

function mapState(store) {
  return {
    fetching: store.slist.fetching,
    fetched: store.slist.fetched,
    selectionList: store.slist.selectionList
  }
}

class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.toggleErrorDialog = this.toggleErrorDialog.bind(this);
      this.state = {selectValue: 10, error: false};
    }

    clickAdd(e) { 
/*      e.preventDefault();
      this.setState({error: false})
      const newFood = {
        name: this.refs.meal_input.value,
        key: this.refs.meal_input.value,
        date: Date.now(),
        weight: this.state.selectValue
      };
      FoodAPIs.addFood(newFood).then((res) => {
	 if( !res.error ) {
	   this.setState({jsonResults: res, selectValue: 10})
	   this.refs.meal_input.value = "";
	 } else {
	   this.setState({error: true})
	 }
      })*/
      this.props.dispatch(slist.addItem("foo"));
    }

    componentDidMount() {
      this.props.dispatch(slist.fetchList())
    }

    handleChange(e) {
      this.setState({selectValue:e.target.value});
    }

    handleEvent(e) {
      if( e.keyCode === 13 ) {
	this.clickAdd(e);
      } else if( e.keyCode === 27 ) {
	this.refs.meal_input.value = "";
      }
    }

    toggleErrorDialog(displayError) {
      this.setState({error: displayError})
    }

    render() {
			console.log(this.props.selectionList)
      return(
	<div>
	  <ErrorDisplay displayError={this.state.error} toggleErrorDialog={this.toggleErrorDialog} />
  	  <div>
	    <FoodList dislayError={this.state.error} toggleErrorDialog={this.toggleErrorDialog} />
	  </div>
          <div className="ui divider"></div>
	  <h4 className="ui header">Add an entry</h4>
	    <div className="menu">
	      <div className="ui left input">
                <input onKeyDown={this.handleEvent.bind(this)} type="text" ref="meal_input" name="meal-type" placeholder="Enter a meal choice..."></input>
		<select className="ui dropdown" value={this.state.selectValue} onChange={this.handleChange}>
		  <option value="10">10</option>
		  <option value="9">9</option>
		  <option value="8">8</option>
		  <option value="7">7</option>
		  <option value="6">6</option>
		  <option value="5">5</option>
		  <option value="4">4</option>
		  <option value="3">3</option>
		  <option value="2">2</option>
		  <option value="1">1</option>
		</select>
		<button className="ui button" onClick={this.clickAdd}>Add</button>
              </div> 
            </div>
	</div>
      );

    }
}

export default connect(mapState)(Manager);
