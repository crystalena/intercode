import React, { Component } from 'react';
import Adbox from './ad-box/Adbox';
import Listing from './listing/Listing';
import { defaultAds } from '../../constants/ads';
import { accounts, MORE_FOR_LESS, DISCOUNT_PRICE } from './accounts';
import { getSpecificAdsCount, getTotal, getFreeAdsCount, updateCartAdsPrice, updateCartAdsBulk } from '../../utils/offers';
import './Checkout.css';

class Checkout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      cart: [],
      special: false,
      specialPricing: this.getPricingForAds()
    }
  }

  getPricingForAds() {
    let newPricing = [];

    for (let i=0; i<defaultAds.length; i++) {
      let obj = defaultAds[i];
      let newObj = {
        id: obj.id,
        name: obj.name,
        defaultPrice: obj.price,
        discount: this.getDiscountPrice(obj.id),
        bulk: this.getBulkPrice(obj.id)
      };
      newPricing.push(newObj);
    }

    return newPricing;
  }

  getOffers() {
    for (let i=0; i<accounts.length; i++) {
      let obj = accounts[i];
      if (obj.name.toLowerCase() === this.props.accName.toLowerCase()) {
        return obj.offers;
      }
    }
  }

  getDiscountPrice(adId) {
    let offers = this.getOffers();
    if (offers) {
      for (let j=0; j<offers.length; j++) {
        let offer = offers[j];

        if (offer.type === DISCOUNT_PRICE && adId === offer.offer.id) {
          return {starts: offer.offer.starts, price: offer.offer.price};
        }
      }
    }
  }

  getBulkPrice(adId) {
    let offers = this.getOffers();
    if (offers) {
      for (let j=0; j<offers.length; j++) {
        let offer = offers[j];

        if (offer.type === MORE_FOR_LESS && adId === offer.offer.id) {
          return {total: offer.offer.total, paid: offer.offer.paid};
        }
      }
    }
  }

  applyDiscount(ad) {
    if (ad.discount && getSpecificAdsCount(ad.id, this.state.cart) >= ad.discount.starts) {
      this.setState({ cart: updateCartAdsPrice(ad.id, ad.discount.price, this.state.cart) });
    }
  }

  applyBulk(ad) {
    let totalAds = getSpecificAdsCount(ad.id, this.state.cart);
    if (ad.bulk && totalAds >= ad.bulk.total) {
      let freeAds = getFreeAdsCount(totalAds, ad.bulk.total, ad.bulk.paid);
      this.setState({ cart: updateCartAdsBulk(ad.id, freeAds, this.state.cart) });
    }
  }

  addAd(ad) {
    let cart = this.state.cart;
    let newAd = {
      id: ad.id,
      name: ad.name,
      defaultPrice: ad.defaultPrice,
      price: (ad.discount && getSpecificAdsCount(ad.id, cart) >= ad.discount.starts) ? ad.discount.price : ad.defaultPrice,
      starts: ad.discount ? ad.discount.starts : 0,
      bulk: ad.bulk && ad.bulk
    };
    cart.push(newAd);
    this.setState({ cart: cart });

    this.applyDiscount(ad);
    this.applyBulk(ad);
  }

  checkDiscount(ad) {
    if (ad.starts && getSpecificAdsCount(ad.id, this.state.cart) < ad.starts) {
      this.setState({ cart: updateCartAdsPrice(ad.id, ad.defaultPrice, this.state.cart) });
    }
  }

  removeAd(ad) {
    let cart = this.state.cart;

    let removeAdIndex = cart.map((i) => { return i.id }).indexOf(ad.id);
     if (removeAdIndex >= 0)
       cart.splice(removeAdIndex, 1);
    this.setState({ cart: cart });

    this.checkDiscount(ad);
    this.applyBulk(ad);
  }

  onExit() {
    location.reload();
  }

  render() {
    return (
      <div className="checkout">
        { this.props.accName && <div className="acc"><h1>Account name: { this.props.accName }</h1><div className="exit" onClick={ this.onExit.bind(this) }>Log out</div></div> }
        <div className="table">
          { this.state.cart.length > 0 && <p className="cart">Cart:</p>}
          {
            this.state.cart.map((ad) => {
              return (
                <Listing name={ ad.name }
                         price={ ad.price }
                         key={ `${ad.id}-${Math.random()}` }
                         onClick={ this.removeAd.bind(this, ad) } />
              )
            })
          }
        </div>
        <div className="ads">
          <p>Click on the ad to add it to your cart</p>
          { this.state.specialPricing.map((ad) => {
              return (
                <Adbox name={ ad.name }
                       price={ ad.discount ? ad.discount.price : ad.defaultPrice }
                       key={ `${ad.id}+${Math.random()}` }
                       onClick={ this.addAd.bind(this, ad) }
                       specialAdNumber={ ad.discount && ad.discount.starts }
                       discount={ ad.discount }
                       defaultPrice={ ad.defaultPrice }
                       bulk={ ad.bulk }
                />
              )
            })
          }
        </div>
        { this.state.cart.length > 0 &&
        <div className="total">
          <div>Total: $ { getTotal(this.state.cart) }</div>
        </div> }
      </div>
    );
  }
}

export default Checkout;
