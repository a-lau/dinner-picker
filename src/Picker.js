import React from 'react'
import FoodAPIs from './FoodAPIs'

export default class Picker extends React.Component {
  
  constructor(props) {
    super(props);
    this.pickFood = this.pickFood.bind(this);
    this.state = {results: null};
  }
  
  pickFood() {
    console.log("pick me")
    FoodAPIs.getList().then(json => {
      const tempCompare = {
	key: null,
	val: null
      }
      json.map(function(item) {
	console.log(tempCompare)
	console.log(item)
	if (!!!tempCompare.val) {
	  tempCompare.key = item.key
	  tempCompare.val = parseInt(item.lastUsed, 10) * item.weight
	} else {
	  const x = parseInt(item.lastUsed, 10) * item.weight
	  if (x > tempCompare.val) {
	    tempCompare.key = item.key
	    tempCompare.val = x
          }
	}
      })
      console.log(tempCompare)
      this.setState({results: tempCompare})
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
