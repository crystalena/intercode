import React, { Component } from 'react';
import Adbox from './ad-box/Adbox';
import Listing from './listing/Listing';
import { defaultAds } from '../../constants/ads.js';
import './Checkout.css';

class Checkout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      cart: []
    };
  }

  addAd(ad) {
    let cart = this.state.cart;
    cart.push(ad);
    this.setState({ cart: cart });
  }

  removeAd(ad) {
    let cart = this.state.cart;

    let removeAdIndex = cart.map((i) => { return i.id }).indexOf(ad.id);
     if (removeAdIndex >= 0)
       cart.splice(removeAdIndex, 1);

    this.setState({ cart: cart });
  }

  render() {
    return (
      <div className="checkout">
        <div className="table">
          { this.state.cart.length >0 && <p className="cart">Cart:</p>}
          {
            this.state.cart.map((ad) => {
              return (
                <Listing name={ ad.name } price={ ad.price } key={ `${ad.id}-${Math.random()}` } onClick={ this.removeAd.bind(this, ad) } />
              )
            })
          }
        </div>
        <div className="ads">
          <p>Click on the ad to add it to your cart</p>
          {
            defaultAds.map((ad) => {
              return (
                <Adbox name={ ad.name } price={ ad.price } key={ `${ad.id}+${Math.random()}` } onClick={ this.addAd.bind(this, ad) }/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Checkout;
