import React from 'react';

import { connect } from 'react-redux';
import * as slist from '../actions/selectionListActions';
import * as foodChoice from '../actions/foodChoiceActions';

function mapState(store) {
  return {
    selectionList: store.slist.selectionList,
    displayedFood: store.foodChoice.displayedFood,
  }
}

class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.pickFood = this.pickFood.bind(this);
  }
  
  pickFood() {
    /*FoodAPIs.getList().then(json => {
      const tempCompare = {
	key: null,
	val: null,
        time: Date.now(),
    	date: null
      }
      json.map(function(item) {
        const modded = (tempCompare.time - item.modDate) * item.weight / 86400000 // converting ms to days
	if (!!!tempCompare.val) {
	  tempCompare.key = item.key
	  tempCompare.val = modded
	  if(item.lastUsed) {
            tempCompare.date = item.lastUsed
	  } else {
	    tempCompare.date = "Not yet eaten"
          }
	} else {
	  if (modded > tempCompare.val) {
	    tempCompare.key = item.key
	    tempCompare.val = modded
	    if(item.lastUsed) {
	      tempCompare.date = item.lastUsed
	    } else {
	      tempCompare.date = "Not yet eaten"
	    }
          }
	}
      return null
      })
      this.props.dispatch(foodChoice.setDisplayFood(tempCompare));
      // new dispatch to update the chosen item
    });*/
      this.props.dispatch(foodChoice.setDisplayedFood("tempCompare"));
  }

  render() {
    return(
      <div>
        <button className="ui button" onClick={this.pickFood}>Tell me what to eat</button>
      </div>
    );
  }
}

export default connect(mapState)(Picker);
