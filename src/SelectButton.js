import React from 'react'
import classnames from 'classnames'

export default class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {green: false, buttonText: "Sounds good"};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({green: true, buttonText: "I'm in"})
    const food = {
       name: this.props.selected,
       date: Date.now(),
    }
    this.props.getFood(food)
  }

  render() {
	  console.log(this.state.buttonText)
    let classes = classnames('ui button specialButton', {green: this.state.green})
    return <button className={classes} onClick={this.onClick} >{this.state.buttonText}</button>
  }
}
