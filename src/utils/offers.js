import { defaultAds } from '../constants/ads.js';

function getSpecificAdsCount(adId) {
  return 5;
}

export function getDiscountedPriceForNumberOfAds(adId, number, discountedPrice) {
  let adPrice = defaultAds[`${adId}`].price;
  console.log(adPrice);

  if (getSpecificAdsCount(adId) >= number) {
    return discountedPrice;
  }

  return adPrice;
}

export function getMoreForLessAdsDiscount(adId, totalAdsNumber, paidAdsNumber) {
  let adPrice = defaultAds[`${adId}`].price;
  console.log(adPrice);
  let freeAds = totalAdsNumber - paidAdsNumber;
  let timesDiscount = getSpecificAdsCount(adId) % totalAdsNumber;

  return timesDiscount * freeAds * adPrice;
}