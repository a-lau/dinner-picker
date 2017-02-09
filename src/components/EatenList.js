import React from 'react';

import { connect } from 'react-redux';
import * as elist from '../actions/eatenListActions';

function mapState(store) {
  return {
    fetching: store.elist.fetching,
    fetched: store.elist.fetched,
    eatenList: store.elist.eatenList
  }
}

class EatenList extends React.Component {
  componentWillMount() {
    this.props.dispatch(elist.fetchList())
  }

  render() {
    if(this.props.fetching) {
      return <div> Loading... </div>
    } else {
    return (
      <table className="ui striped table">
        <thead>
          <tr>
            <th className="eight wide">Name</th>
            <th className="four wide">Date</th>
          </tr>
      </thead>
      <tbody>
      {this.props.eatenList.map(function(item) {
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

export default connect(mapState)(EatenList);
