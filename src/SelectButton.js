import React from 'react'
import classnames from 'classnames'

export default class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {green: this.props.green, buttonText: this.props.buttonText};
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
	  console.log(nextProps)
    this.setState({green: nextProps.green, buttonText: nextProps.buttonText})
  }

  onClick() {
    const food = {
       name: this.props.selected,
       date: Date.now(),
    }
    this.props.getFood(food)
    this.props.updateButton("I'm in", true)
  }

  render() {
	  console.log(this.state.buttonText)
    let classes = classnames('ui button specialButton', {green: this.props.green})
    return <button className={classes} onClick={this.onClick} >{this.props.buttonText}</button>
  }
}
