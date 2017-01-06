import React from 'react'

import FoodAPIs from './FoodAPIs'

export default class FoodList extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {jsonResults: null};
  }

  componentDidMount() {
    FoodAPIs.getList().then(json => {
      this.setState({jsonResults: json})
    });
  }

  clickDelete(props) {
    const delFood = {
      key: props 
    };
    FoodAPIs.delFood(delFood).then((res) => {
      this.setState({jsonResults: res})
    })
  }

  render() {
    if (!!!this.state.jsonResults) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="ui middle aligned selection list">
	  {this.state.jsonResults.map(function(item) {
	    return(
	      <div className="item" key={item.name}>
	        <div className="right floated content">
		  <i className="edit icon" onClick={() => this.startEdit(item.key)}></i>
		  <i className="trash icon" onClick={() => this.clickDelete(item.key)}></i>
		</div>
		<div className="content">
		  <div className="header">{item.name}</div>
		</div>
	      </div>
	    )
	  }, this)}
	</div>
      )
    }
  }
}
