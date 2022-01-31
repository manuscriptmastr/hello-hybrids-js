import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import ITEMS from './items.js';
import AppStore, { addToCartByPlu } from './store.js';

const handleClick = curry((plu, { store }) => addToCartByPlu(store, plu));

define({
  tag: 'app-menu',
  store: parent(AppStore),
  render: () => html`
    <h2>Choose from the following:</h2>
    <ul>
      ${ITEMS.map(({ name, price, plu }) =>
        html`<li>
          <button onclick="${handleClick(plu)}">
            Buy a ${name} (${price})
          </button>
        </li>`.key(plu)
      )}
    </ul>
  `,
});
