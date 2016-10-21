import { defaultAds } from '../constants/ads.js';

export function getSpecificAdsCount(adId, cart) {
  let total=0;
  for (let i=0; i<cart.length; i++) {
    let obj = cart[i];
    if (obj.id === adId) {
      total++;
    }
  }
  return total;
}

export function getDiscountedPriceForNumberOfAds(adId, cart, number, discountedPrice) {
  let adPrice = defaultAds[`${adId}`].price;
  console.log(adPrice);

  if (getSpecificAdsCount(adId, cart) >= number) {
    return discountedPrice;
  }

  return adPrice;
}

export function getMoreForLessAdsDiscount(adId, cart, totalAdsNumber, paidAdsNumber) {
  let adPrice = defaultAds[`${adId}`].price;
  console.log(adPrice);
  let freeAds = totalAdsNumber - paidAdsNumber;
  let timesDiscount = getSpecificAdsCount(adId, cart) % totalAdsNumber;

  return timesDiscount * freeAds * adPrice;
}