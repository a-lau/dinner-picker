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
    return (
      <table className="ui striped table">
        <thead>
	  <tr><th className="eight wide">Name</th>
	  <th className="four wide">Date</th>
	</tr></thead>
        <tbody>
        {this.state.jsonEaten.map(function(item) {
          return (
	    <tr key={item.key}>
	      <td>{item.name}</td>
	      <td>{item.dateUsed}</td>
	    </tr>
	 )}, this)}
	</tbody>
      </table>
   )}
  }
}
