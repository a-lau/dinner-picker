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
  render() {
    return <div> Woo </div>
  }
}
