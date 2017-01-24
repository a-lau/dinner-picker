import React from 'react'
import classnames from 'classnames'

export default class SelectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({active: true})
    const food = {
       name: this.props.selected,
       date: Date.now(),
    }
    this.props.getFood(food)
  }

  render() {
    let classes = classnames('ui button', {active: this.state.active})
    return <button className={classes} onClick={this.onClick} > Sounds good </button>
  }
}
