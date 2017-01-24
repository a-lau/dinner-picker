import React from 'react';

export default class EatenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jsonEaten: null}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({jsonEaten: nextProps.el});
  }

  /*getEatenList(list) {
    var newList = list
    newList.reverse()
    this.setState({jsonEaten: newList});
    console.log("get list")
	    console.log(newList)
  }*/

  render() {
	  console.log(this.state.jsonEaten)
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
	  var newDate = new Date(item.dateUsed).toString().substring(0,16)
          return (
	    <tr key={item.key}>
	      <td>{item.name}</td>
	      <td>{newDate}</td>
	    </tr>
	 )}, this)}
	</tbody>
      </table>
   )}
  }
}
