import React from 'react'

import FoodList from './FoodList'
import ErrorDisplay from './ErrorDisplay'

import { connect } from 'react-redux';
import * as slist from '../actions/selectionListActions';

function mapState(store) {
  return {
    fetching: store.slist.fetching,
    fetched: store.slist.fetched,
	error: store.slist.error,
    selectionList: store.slist.selectionList
  }
}

class Manager extends React.Component {
    constructor(props) {
      super(props);
      this.clickAdd = this.clickAdd.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {selectValue: 10};
    }

    clickAdd(e) { 
      e.preventDefault();
      this.props.dispatch(slist.clearError())
      const newFood = {
        name: this.refs.meal_input.value,
        key: this.refs.meal_input.value,
        date: Date.now(),
        weight: this.state.selectValue
      };
      this.props.dispatch(slist.addItem(newFood));
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

    render() {
			console.log("manager render")
      return(
	<div>
	  <ErrorDisplay displayError={this.props.error} />
  	  <div>
	    <FoodList dislayError={this.state.error} />
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
