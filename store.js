import { define } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import ITEMS from './items.js';

const setQuantity = curry((quantityOrFn, row) => ({
  ...row,
  quantity:
    typeof quantityOrFn === 'function'
      ? quantityOrFn(row.quantity)
      : quantityOrFn,
}));

export const addToCartByPlu = curry((store, plu) => {
  const item = ITEMS.find((item) => item.plu === plu);
  const { cart } = store;
  const newCart = cart.find(({ item }) => item.plu === plu)
    ? cart.map((row) =>
        row.item.plu === plu ? setQuantity((x) => x + 1, row) : row
      )
    : [...cart, { item, quantity: 1 }];

  store.cart = newCart;
});

export default define({
  tag: 'app-store',
  cart: {
    get: (host, value = []) => value,
    set: (host, value) => value,
  },
});
