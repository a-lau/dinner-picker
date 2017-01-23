import React from 'react';

export default class EatenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jsonEaten: null}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({jsonEaten: nextProps.el});
  }

  getEatenList(list) {
    this.setState({jsonEaten: list});
  }

  render() {
    if(!!!this.state.jsonEaten) {
      return <div> Loading... </div>
    } else {
    return (<div className="ui middle aligned selection list">
      {this.state.jsonEaten.map(function(item) {
        return <div key={item.key}>{item.name}</div>
      }, this)}
    </div> )
    }
  }
}
