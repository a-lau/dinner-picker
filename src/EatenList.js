import React from 'react';
import FoodAPIs from './FoodAPIs';

export default class EatenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jsonEaten: null}
  }

  componentDidMount() {
    FoodAPIs.getEaten().then(json => {
      this.setState({jsonEaten: json})
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({jsonEaten: nextProps});
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
        return <div>{item.namei}</div>
      }, this)}
    </div> )
    }
  }
}
