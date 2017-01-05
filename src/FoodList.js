import React from 'react'

export default class FoodList extends React.Component {
  listItems() {
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
