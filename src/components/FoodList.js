import React from 'react';

import { connect } from 'react-redux';
import * as slist from '../actions/selectionListActions';

function mapState(store) {
  return {
    fetching: store.slist.fetching,
    fetched: store.slist.fetched,
    selectionList: store.slist.selectionList
  }
}

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

class FoodList extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {editing: null, selectValue: 10, inputVal: null}
    this.handleChange = this.handleChange.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  clickDelete(props) {
    const delFood = {
      key: props 
    };
    this.props.dispatch(slist.delItem(delFood))
  }

  toggleEdit(item) {
    this.setState({editing: item.key, selectValue: item.weight})
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
    this.props.dispatch(slist.updateItem(updatedItem))
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
	<div className="item middle aligned" key={item.name}>
	  <div className="ui input">
	    <InputField onKeyDown={this.handleEvent.bind(this)} type="text" defaultValue={item.key} updateInput={this.updateInput} />
	    <select className="ui dropdown" value={this.state.selectValue} onChange={this.handleChange.bind(this, item)}>
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
        <div className="item" key={item.name} onClick={() => this.toggleEdit(item)}>
          <div className="right floated content">
            <i className="remove icon" onClick={() => this.clickDelete(item.key)}></i>
          </div>
          <div className="content">
            <div className="header">{item.name}</div>
          </div>
        </div>
      )
    }
  }

  render() {
    if (this.props.fetching) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="ui middle aligned selection list">
	  {this.props.selectionList.map(function(item) {
	    return this.renderItemOrEditField(item)
	  }, this)}
	</div>
      )
    }
  }
}

export default connect(mapState)(FoodList);
