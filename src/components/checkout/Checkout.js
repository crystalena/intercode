import React, { Component } from 'react';
import Adbox from './ad-box/Adbox';
import Listing from './listing/Listing';
import { defaultAds } from '../../constants/ads';
import { accounts, MORE_FOR_LESS, DISCOUNT_PRICE } from './accounts';
import { getDiscountedPriceForNumberOfAds, getMoreForLessAdsDiscount } from '../../utils/offers';
import './Checkout.css';

class Checkout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      cart: [],
      special: false,
      specialPricing: defaultAds
    }
  }

  componentDidMount() {
    this.findOffers();
  }

  getNewPriceForAllAds(ad, price) {
    let ads = defaultAds;
    for (let i=0; i<ads.length; i++) {
      let obj = ads[i];
      if (obj.id === ad) {
        obj.price = price;
        obj['special'] = true;
      }
    }
    this.setState({ specialPricing: ads });
  }

  findOffers() {
    for (let i=0; i<accounts.length; i++) {
      let obj = accounts[i];
      if (obj.name === this.props.accName) {
        let offers = obj.offers;
        for (let j=0; j<offers.length; j++) {
          let offer = offers[j];

          if (offer.type === MORE_FOR_LESS) {

          }
          if (offer.type === DISCOUNT_PRICE) {
            let o = offer.offer;
            if (o.starts === 1) {
              console.log('offer 1');
              this.getNewPriceForAllAds(o.ad, o.price);
            }

            //getDiscountedPriceForNumberOfAds(offer.ad, offer.starts, offer.price, this.state.cart);
          }
        }
      }
    }
  }

  getTotal() {
    let cart = this.state.cart;
    let total = 0;
    for (let i=0; i<cart.length; i++) {
      let obj = cart[i];
      total+= obj.price;
    }

    return total;
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
        { this.props.accName && <h1 className="acc">Account name: { this.props.accName }</h1> }
        <div className="table">
          { this.state.cart.length > 0 && <p className="cart">Cart:</p>}
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
          { this.state.specialPricing.map((ad) => {
              return (
                <Adbox name={ ad.name }
                       price={ ad.price }
                       key={ `${ad.id}+${Math.random()}` }
                       onClick={ this.addAd.bind(this, ad) }
                       specialAdNumber=''
                       special={ this.state.special }
                />
              )
            })
          }
        </div>
        { this.state.cart.length > 0 &&
        <div className="total">
          <div>Total: $ { this.getTotal() }</div>
        </div> }
      </div>
    );
  }
}

export default Checkout;
