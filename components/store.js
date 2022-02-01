import { define } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import ITEMS from '../items.js';

const setQuantity = curry((quantityOrFn, row) => ({
  ...row,
  quantity:
    typeof quantityOrFn === 'function'
      ? quantityOrFn(row.quantity)
      : quantityOrFn,
}));

const updateItemByPlu = curry((fn, plu, cart) => {
  const exists = cart.find(({ item }) => item.plu === plu);
  if (!exists) {
    throw new Error(`Item with plu '${plu}' does not exist in cart.`);
  }
  return cart.map((row) => (row.item.plu === plu ? fn(row) : row));
});

export const setQuantityByPlu = curry((store, plu, quantity) => {
  store.cart = updateItemByPlu(setQuantity(quantity), plu, store.cart);
});

export const addItemByPlu = curry((store, plu) => {
  const item = ITEMS.find((item) => item.plu === plu);
  store.cart = [...store.cart, { item, quantity: 1 }];
});

export const removeItemByPlu = curry((store, plu) => {
  const exists = store.cart.find(({ item }) => item.plu === plu);
  if (!exists) {
    throw new Error(`Item with plu '${plu}' does not exist in cart.`);
  }

  store.cart = store.cart.filter(({ item }) => item.plu !== plu);
});

export default define({
  tag: 'app-store',
  cart: {
    get: (host, value = []) => value,
    set: (host, value) => value,
  },
});
