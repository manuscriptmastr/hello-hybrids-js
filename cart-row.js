import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry, range } from 'https://unpkg.com/ramda@0.28.0/es';
import AppStore, { removeItemByPlu, setQuantityByPlu } from './store.js';

const handleSelect = curry((plu, { store }, event) => {
  setQuantityByPlu(store, plu, parseInt(event.target.value, 10));
});

const handleRemove = curry((plu, { store }, event) => {
  event.preventDefault();
  removeItemByPlu(store, plu);
});

define({
  tag: 'cart-row',
  name: '',
  quantity: 0,
  price: '$0.00',
  plu: 0,
  store: parent(AppStore),
  render: ({ name, quantity, price, plu }) =>
    html`<li>
      ${name}: ${price}x<select
        value="${quantity}"
        onchange="${handleSelect(plu)}"
      >
        ${range(1, 11).map(
          (opt) => html`<option value="${opt}">${opt}</option>`
        )}</select
      ><button onclick="${handleRemove(plu)}">x</button>
    </li>`,
});
