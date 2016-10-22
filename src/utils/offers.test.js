import { getSpecificAdsCount, getTotal, getFreeAdsCount, updateCartAdsPrice, updateCartAdsBulk } from './offers.js';

it('gets the right number of all standout ads', () => {
  const cart = [
    { id: 'classic' },
    { id: 'premium' },
    { id: 'classic' },
    { id: 'classic' },
    { id: 'standout' },
    { id: 'premium' },
    { id: 'classic' }
  ];
  expect(getSpecificAdsCount('standout', cart)).toEqual(1);
  expect(getSpecificAdsCount('premium', cart)).toEqual(2);
  expect(getSpecificAdsCount('classic', cart)).toEqual(4);
});

it('gets the total pricing of ads in cart', () => {
  const cart = [
    { price: 399.99 },
    { price: 399.99 },
    { price: 299.99 }
  ];
  expect(getTotal(cart)).toEqual('1099.97');
});

it('gets the free ads count when bulk is 5 for 4 if total ads number is 12', () => {
  const totalAds = 12;
  const bulkTotal = 5;
  const bulkPaid = 4;
  expect(getFreeAdsCount(totalAds, bulkTotal, bulkPaid)).toEqual(2);
});

it('updates the price for classic ads to 237 in cart', () => {
  const cart = [
    { id: 'classic', price: 269.99 },
    { id: 'premium', price: 394.99 },
    { id: 'standout', price: 322.99 }
  ];
  const newCart = [
    { id: 'classic', price: 237 },
    { id: 'premium', price: 394.99 },
    { id: 'standout', price: 322.99 }
  ];
  expect(updateCartAdsPrice('classic', 237, cart)).toEqual(newCart);
});

it('updates the price for 2 classic ads to 0', () => {
  const cart = [
    { id: 'classic', price: 269.99 },
    { id: 'classic', price: 269.99 },
    { id: 'premium', price: 394.99 },
    { id: 'standout', price: 322.99 }
  ];
  const newCart = [
    { id: 'classic', price: 0 },
    { id: 'classic', price: 0 },
    { id: 'premium', price: 394.99 },
    { id: 'standout', price: 322.99 }
  ];
  expect(updateCartAdsBulk('classic', 2, cart)).toEqual(newCart);
});