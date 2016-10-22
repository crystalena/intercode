import React, { Component } from 'react';
import './Adbox.css';

class Adbox extends Component {
  render() {
    return (
      <div className="adBox" onClick={ this.props.onClick }>
        <h2 className="heading">{ this.props.name }</h2>
        <p className="price">{ this.props.price }</p>
        { this.props.discount && <p className="special">Special price just for you from the { this.props.specialAdNumber } ad!<br/>
          Normally { this.props.defaultPrice }</p> }
        { this.props.bulk && <p className="special">These ads are { this.props.bulk.total } for { this.props.bulk.paid } just for you!</p> }
      </div>
    );
  }
}

export default Adbox;
