import {getDiscountedPriceForNumberOfAds, getMoreForLessAdsDiscount} from './offers.js';

it('gets discounted price for all standout ads', () => {
  expect(getDiscountedPriceForNumberOfAds('standout', 1, 389.99).toEqual(389.99));
});

it('gets discounted price for premium ads from 4th ad', () => {
  expect(getDiscountedPriceForNumberOfAds('premium', 4, 379.99).toEqual(379.99));
});

it('gets discount for 2 classic ads if 10 are purchased and the offer is 4 for 5', () => {
  const getSpecificAdsCount = jest.fn();
  getSpecificAdsCount.mockReturnValueOnce(10);

  expect(getMoreForLessAdsDiscount('classic', 5, 4).toEqual())
});