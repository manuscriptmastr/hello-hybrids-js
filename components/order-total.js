import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import AppStore from '../store/index.js';
import { multiply, sum } from '../utils/money.js';

export default define({
  tag: 'order-total',
  store: parent(AppStore),
  total: ({ store }) =>
    sum(
      store.cart.map(({ item: { price }, quantity }) =>
        multiply(price, quantity)
      )
    ),
  valid: ({ store }) => store.valid,
  render: ({ total, valid }) =>
    html`<checkout-tile title="Your Total"
      ><p>Total: ${total}</p>
      <button type="submit" disabled="${!valid}">
        Submit Order
      </button></checkout-tile
    >`,
});
