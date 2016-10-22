import React, { Component } from 'react';
import Adbox from './ad-box/Adbox';
import Listing from './listing/Listing';
import { defaultAds } from '../../constants/ads';
import { accounts, MORE_FOR_LESS, DISCOUNT_PRICE } from './accounts';
import { getDiscountedPriceForNumberOfAds, getMoreForLessAdsDiscount, getSpecificAdsCount } from '../../utils/offers';
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

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  getPricingForAds() {
    let newPricing = [];

    for (let i=0; i<defaultAds.length; i++) {
      let obj = defaultAds[i];
      let newObj = {
        id: obj.id,
        name: obj.name,
        defaultPrice: obj.price,
        discount: this.getDiscountPrice(obj.id)
      };
      newPricing.push(newObj);
    }

    return newPricing;
  }

  getDiscountPrice(adId) {
    for (let i=0; i<accounts.length; i++) {
      let obj = accounts[i];
      if (obj.name === this.props.accName) {

        let offers = obj.offers;
        for (let j=0; j<offers.length; j++) {
          let offer = offers[j];

          if (offer.type === DISCOUNT_PRICE && adId === offer.offer.id) {
             return { starts: offer.offer.starts, price: offer.offer.price };
          }
        }
      }
    }
  }

  // getNewPriceForAds(ad, starts, price) {
  //   let ads = defaultAds;
  //   for (let i=0; i<ads.length; i++) {
  //     let obj = ads[i];
  //     if (obj.id === ad) {
  //       obj.price = price;
  //       obj['special'] = true;
  //       obj['from'] = starts;
  //     }
  //   }
  //   this.setState({ specialPricing: ads });
  // }

  // findOffers() {
  //   for (let i=0; i<accounts.length; i++) {
  //     let obj = accounts[i];
  //     if (obj.name === this.props.accName) {
  //
  //       let offers = obj.offers;
  //       for (let j=0; j<offers.length; j++) {
  //         let offer = offers[j];
  //
  //         if (offer.type === MORE_FOR_LESS) {
  //           this.setState({ moreForLess: offer.offer });
  //         }
  //         if (offer.type === DISCOUNT_PRICE) {
  //           let o = offer.offer;
  //           this.setState({ discount: o });
  //         }
  //       }
  //     }
  //   }
  // }

  // getDiscount() {
  //   let discount = this.state.discount;
  //   if (discount) {
  //     let ad = discount.id;
  //     let oldPrice = this.state.specialPricing.filter((i) => { return i.id === ad})[0].price;
  //
  //     let adCount = getSpecificAdsCount(ad, this.state.cart);
  //     if (adCount >= discount.starts) {
  //       return (oldPrice - discount.price) * adCount;
  //     }
  //   }
  // }

  getTotal() {
    let cart = this.state.cart;
    let total = 0;
    for (let i=0; i<cart.length; i++) {
      let obj = cart[i];
      total+= obj.price;
    }
    return total.toFixed(2);
  }

  addAd(ad) {
    let cart = this.state.cart;
    let newAd = {
      id: ad.id,
      name: ad.name,
      defaultPrice: ad.defaultPrice,
      price: (ad.discount && getSpecificAdsCount(ad.id, cart) >= ad.discount.starts) ? ad.discount.price : ad.defaultPrice,
      starts: ad.discount ? ad.discount.starts : 0
    };
    cart.push(newAd);
    this.setState({ cart: cart });

    if (ad.discount && getSpecificAdsCount(ad.id, cart) >= ad.discount.starts) {
      this.setState({ cart: this.updateCart(ad.id, ad.discount.price) });
    }
  }

  updateCart(adId, price) {
    let cart = this.state.cart;
    let newCart = [];
    for (let i=0; i<cart.length; i++) {
      let obj = cart[i];
      if (obj.id === adId) {
        obj.price = price;
      }
      newCart.push(obj);
    }
    return newCart;
  }

  removeAd(ad) {
    let cart = this.state.cart;

    let removeAdIndex = cart.map((i) => { return i.id }).indexOf(ad.id);
     if (removeAdIndex >= 0)
       cart.splice(removeAdIndex, 1);
    this.setState({ cart: cart });

    if (ad.starts && getSpecificAdsCount(ad.id, cart) < ad.starts) {
      this.setState({ cart: this.updateCart(ad.id, ad.defaultPrice) });
    }
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
                       special={ ad.discount }
                       defaultPrice={ ad.defaultPrice }
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
