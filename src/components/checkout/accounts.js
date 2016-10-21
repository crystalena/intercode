export const MORE_FOR_LESS = 'moreforless';
export const DISCOUNT_PRICE = 'discountprice';

export const accounts = [
  {
    name: 'Unilever',
    offers: [
      {
        type: MORE_FOR_LESS,
        offer: {ad: 'classic', total: 3, paid: 2}
      }
    ]
  },
  {
    name: 'Apple',
    offers: [
      {
        type: DISCOUNT_PRICE,
        offer: {ad: 'standout', starts: 1, price: 299.99}
      }
    ]
  },
  {
    name: 'Nike',
    offers: [
      {
        type: DISCOUNT_PRICE,
        offer: {ad: 'premium', starts: 4, price: 379.99}
      }
    ]
  },
  {
    name: 'Ford',
    offers: [
      {
        type: MORE_FOR_LESS,
        offer: {ad: 'classic', starts: 5, paid: 4}
      },
      {
        type: DISCOUNT_PRICE,
        offer: {ad: 'standout', starts: 1, paid: 309.99}
      },
      {
        type: DISCOUNT_PRICE,
        discount: {ad: 'premium', starts: 3, paid: 389.99}
      }
    ]
  }
]