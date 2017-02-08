import React from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
//import * as foodChoice from '../actions/foodChoiceActions';
import * as elist from '../actions/eatenListActions';

function mapState(store) {
  return {
    displayedFood: store.foodChoice.displayedFood
  }
}

class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {green: this.props.green, buttonText: this.props.buttonText};
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({green: nextProps.green, buttonText: nextProps.buttonText})
  }

  onClick() {
    const food = {
       name: this.props.displayedFood.key,
       date: Date.now(),
    }
    this.props.dispatch(elist.addItem(food))
    this.props.updateButton("I'm in", true)
  }

  render() {
    let classes = classnames('ui button specialButton', {green: this.props.green})
    return <button className={classes} onClick={this.onClick} >{this.props.buttonText}</button>
  }
}

export default connect(mapState)(SelectButton);
