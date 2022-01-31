import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { multiply, sum } from './money.js';
import AppStore from './store.js';

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
          plu="${plu}"
          quantity="${quantity}"
        />`.key(name)
      )}
    </ul>`,
});
