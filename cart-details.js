import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import { multiply, sum } from './money.js';
import AppStore, { removeItemByPlu, setQuantityByPlu } from './store.js';

const handleQuantity = curry((plu, { store }, { detail }) => {
  setQuantityByPlu(store, plu, detail);
});

const handleRemove = curry((plu, { store }, options) => {
  removeItemByPlu(store, plu);
});

define({
  tag: 'cart-details',
  store: parent(AppStore),
  cart: ({ store }) => store.cart,
  total: ({ cart }) =>
    sum(cart.map(({ item: { price }, quantity }) => multiply(price, quantity))),
  render: ({ cart, total }) => html` <h2>
      ${cart.length ? `Your cart total: ${total}` : 'Your cart is empty'}
    </h2>
    <ul>
      ${cart.map(({ item: { name, price, plu }, quantity }) =>
        html`<cart-row
          name="${name}"
          price="${price}"
          quantity="${quantity}"
          onquantity="${handleQuantity(plu)}"
          onremove="${handleRemove(plu)}"
        />`.key(name)
      )}
    </ul>`,
});
