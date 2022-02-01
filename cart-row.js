import { define, dispatch, html, parent } from 'https://unpkg.com/hybrids@^7';
import { range } from 'https://unpkg.com/ramda@0.28.0/es';
import AppStore from './store.js';

const handleSelect = (host, event) =>
  dispatch(host, 'quantity', { detail: parseInt(event.target.value, 10) });

const handleRemove = (host, event) => dispatch(host, 'remove');

define({
  tag: 'cart-row',
  name: '',
  quantity: 0,
  price: '$0.00',
  store: parent(AppStore),
  render: ({ name, quantity, price }) =>
    html`<li>
      ${name}: ${price}x<select value="${quantity}" onchange="${handleSelect}">
        ${range(1, 11).map(
          (opt) => html`<option value="${opt}">${opt}</option>`
        )}</select
      ><button onclick="${handleRemove}">x</button>
    </li>`,
});
