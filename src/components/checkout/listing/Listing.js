import React, { Component } from 'react';
import './Listing.css';

class Listing extends Component {
  render() {
    return (
      <div className="listing">
        <h2 className="listName">{ this.props.name }</h2>
        <p className="listPrice">{ this.props.price }</p>
        <span className="cross" onClick={ this.props.onClick }>&#10005;</span>
      </div>
    );
  }
}

export default Listing;
