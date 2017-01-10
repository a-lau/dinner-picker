import React from 'react'

import FoodAPIs from './FoodAPIs'

export default class FoodList extends React.Component {
 
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {jsonResults: props.fl}
    this.state = {editing: null}
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

  toggleEdit(itemKey) {
    this.setState({editing: itemKey})
  }

  handleEvent(e) {
    if ( e.keyCode === 13 ) {
      let target = e.target,
	updatedItem = {};
      updatedItem.key = target.value;
      updatedItem.name = target.value;
      console.log(updatedItem)
      FoodAPIs.editFood(updatedItem).then((res) => {
	console.log(res)
        this.setState({jsonResults: res})
	this.setState({editing: null})
      })
    }
  }

  renderItemOrEditField(item) {
    if ( this.state.editing === item.key ) {
      console.log("render edit inline")
      return(
	<div className="ui input focus" key={item.name}>
	  <input onKeyDown={this.handleEvent.bind(this)} type="text" defaultValue={item.key}></input>
        </div>
      )
    } else {
      return(
        <div className="item" key={item.name}>
          <div className="right floated content">
            <i className="edit icon" onClick={() => this.toggleEdit(item.key)}></i>
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
