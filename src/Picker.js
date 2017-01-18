import React from 'react'
import FoodAPIs from './FoodAPIs'

export default class Picker extends React.Component {
  
  constructor(props) {
    super(props);
    this.pickFood = this.pickFood.bind(this);
  }
  
  pickFood() {
    FoodAPIs.getList().then(json => {
      const tempCompare = {
	key: null,
	val: null
      }
      const currTime = Date.now();
      json.map(function(item) {
        const modded = (currTime - item.lastUsed) * item.weight / 86400000 // converting ms to days
	if (!!!tempCompare.val) {
	  tempCompare.key = item.key
	  tempCompare.val = modded
	} else {
	  if (modded > tempCompare.val) {
	    tempCompare.key = item.key
	    tempCompare.val = modded
          }
	}
      return null
      })
      this.props.getResults(tempCompare);
    });
  }

  render() {
    return(
      <div>
        <button className="ui button" onClick={this.pickFood} >Pick my meal</button>
      </div>
    );
  }
}
