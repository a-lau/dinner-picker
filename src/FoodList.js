import React from 'react'

import FoodAPIs from './FoodAPIs'

export default class FoodList extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {jsonResults: props.fl, editing: null, selectValue: 1}
    this.focus = this.focus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({jsonResults: nextProps.fl})
  }
  focus() {
	  console.log("focus call?")
		  console.log(this.textInput)
    this.textInput.focus();
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
    //this.setState({editing: itemKey}, this.focus())
    this.setState({editing: itemKey})
  }

  handleChange(item, e) {
    item.weight = e.target.value
    this.setState({selectValue: item.weight});
  }

  clickSave(itemKey) {
    const updatedItem = {};
    updatedItem.key = this.textInput.value;
    updatedItem.name = this.textInput.value;
    updatedItem.old = this.state.editing;
    updatedItem.weight = this.state.selectValue;
    updatedItem.date = Date.now();
    FoodAPIs.editFood(updatedItem).then((res) => {
      this.setState({jsonResults: res, editing: null})
    })
  }

  cancelEdit() {
    this.setState({editing: null})
  }

  handleEvent(e) {
    if ( e.keyCode === 13 ) {
      let target = e.target,
	updatedItem = {};
      updatedItem.key = target.value;
      updatedItem.name = target.value;
      updatedItem.old = this.state.editing;
      updatedItem.weight = this.state.selectValue;
      updatedItem.date = Date.now();
      FoodAPIs.editFood(updatedItem).then((res) => {
        this.setState({jsonResults: res, editing: null})
      })
    } else if ( e.keyCode === 27 ) {
      this.setState({editing: null})
    }
  }

  renderItemOrEditField(item) {
    if ( this.state.editing === item.key ) {
      return(
	<div className="item" key={item.name}>
	  <div className="ui input">
	    <input onKeyDown={this.handleEvent.bind(this)} type="text" defaultValue={item.key} ref={(input) => {this.textInput=input}}></input>
	    <select className="ui dropdown" value={item.weight} onChange={this.handleChange.bind(this, item)}>
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
          </div>
	  <div className="right floated content">
	    <i className="ban icon" onClick={() => this.cancelEdit()}></i>
	    <i className="save icon" onClick={() => this.clickSave(item.key)}></i>
	  </div>
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
