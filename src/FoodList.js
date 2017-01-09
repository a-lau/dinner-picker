import React from 'react'

import FoodAPIs from './FoodAPIs'

export default class FoodList extends React.Component {
 
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {jsonResults: props.fl}
    this.state = {editing: ""}
  }

  componentWillReceiveProps(nextProps)
  {
    this.setState({jsonResults: nextProps.fl})
  }

  clickDelete(props) {
    const delFood = {
      key: props 
    };
    FoodAPIs.delFood(delFood).then((res) => {
      this.setState({jsonResults: res})
    })
  }

  renderItemOrEditField(item) {
    if ( this.state.editing === item.key ) {
      // Render edit fields
    } else {
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
    }
  }

  render() {
    if (!!!this.state.jsonResults) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="ui middle aligned selection list">
	  {this.state.jsonResults.map(function(item) {
	    return this.renderItemOrEditField(item)
	  }, this)}
	</div>
      )
    }
  }
}
