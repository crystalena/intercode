export const MORE_FOR_LESS = 'moreforless';
export const DISCOUNT_PRICE = 'discountprice';

export const accounts = [
  {
    name: 'Unilever',
    offers: [
      {
        type: MORE_FOR_LESS,
        offer: {id: 'classic', total: 3, paid: 2}
      }
    ]
  },
  {
    name: 'Apple',
    offers: [
      {
        type: DISCOUNT_PRICE,
        offer: {id: 'standout', starts: 1, price: 299.99}
      }
    ]
  },
  {
    name: 'Nike',
    offers: [
      {
        type: DISCOUNT_PRICE,
        offer: {id: 'premium', starts: 4, price: 379.99}
      }
    ]
  },
  {
    name: 'Ford',
    offers: [
      {
        type: MORE_FOR_LESS,
        offer: {id: 'classic', total: 5, paid: 4}
      },
      {
        type: DISCOUNT_PRICE,
        offer: {id: 'standout', starts: 1, price: 309.99}
      },
      {
        type: DISCOUNT_PRICE,
        offer: {id: 'premium', starts: 3, price: 389.99}
      }
    ]
  }
]