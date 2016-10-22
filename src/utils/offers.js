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

export function getTotal(cart) {
  let total = 0;
  for (let i=0; i<cart.length; i++) {
    let obj = cart[i];
    total+= obj.price;
  }
  return total.toFixed(2);
}

export function getFreeAdsCount(totalAds, bulkTotal, bulkPaid) {
  return Math.floor(totalAds / bulkTotal) * (bulkTotal - bulkPaid);
}

export function updateCartAdsPrice(adId, price, cart) {
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

export function updateCartAdsBulk(adId, freeAds, cart) {
  let newCart = [];
  let count = 0;
  for (let i=0; i<cart.length; i++) {
    let obj = cart[i];
    if ((obj.id === adId) && (count < freeAds)) {
      obj.price = 0;
      count++;
    }
    newCart.push(obj);
  }

  return newCart;
}