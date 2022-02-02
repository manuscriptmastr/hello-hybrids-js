import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { multiply, sum } from '../money.js';
import AppStore from '../store/index.js';

define({
  tag: 'order-total',
  store: parent(AppStore),
  total: ({ store }) =>
    sum(
      store.cart.map(({ item: { price }, quantity }) =>
        multiply(price, quantity)
      )
    ),
  render: ({ total }) =>
    html`<checkout-tile title="Your Total">${total}</checkout-tile>`,
});
