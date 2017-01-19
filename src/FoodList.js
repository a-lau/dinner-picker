import React from 'react'

import FoodAPIs from './FoodAPIs'

class InputField extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateInput(e.target.value)
  }

  componentDidMount() {
    this.refs.input.focus();
    this.props.updateInput(this.props.defaultValue)
  }

  render() {
    return (
      <input onChange={this.handleChange} onKeyDown={this.props.onKeyDown} type="text" defaultValue={this.props.defaultValue} ref="input"></input>
    )
  }
}

export default class FoodList extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {jsonResults: props.fl, editing: null, selectValue: 10, inputVal: null, error: props.displayError}
    this.handleChange = this.handleChange.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({jsonResults: nextProps.fl, error: nextProps.displayError})
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

  handleChange(item, e) {
    item.weight = e.target.value
    this.setState({selectValue: item.weight});
  }

  updateInput(item) {
    this.setState({inputVal: item});
  }

  clickSave() {
    const updatedItem = {};
    updatedItem.key = this.state.inputVal;
    updatedItem.name = this.state.inputVal;
    updatedItem.old = this.state.editing;
    updatedItem.weight = this.state.selectValue;
    updatedItem.date = Date.now();
    FoodAPIs.editFood(updatedItem).then((res) => {
      if( !res.error ) {
        this.setState({editing: null})
        this.props.updateList(res)
      } else {
	this.props.toggleErrorDialog(true)
      }
    })
  }

  cancelEdit() {
    this.setState({editing: null})
  }

  handleEvent(e) {
    if ( e.keyCode === 13 ) {
      this.clickSave();
    } else if ( e.keyCode === 27 ) {
      this.setState({editing: null})
    }
  }

  renderItemOrEditField(item) {
    if ( this.state.editing === item.key ) {
      return(
	<div className="item" key={item.name}>
	  <div className="ui input">
	    <InputField onKeyDown={this.handleEvent.bind(this)} type="text" defaultValue={item.key} updateInput={this.updateInput} />
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
	    <i className="save icon" onClick={() => this.clickSave()}></i>
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
