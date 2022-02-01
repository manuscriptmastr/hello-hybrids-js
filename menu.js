import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import ITEMS from './items.js';
import AppStore, { addItemByPlu } from './store.js';

const handleClick = curry((plu, { store }) => addItemByPlu(store, plu));

define({
  tag: 'app-menu',
  store: parent(AppStore),
  render: () => html`
    <checkout-tile title="Menu">
      <h3>Choose from the following:</h3>
      <ul>
        ${ITEMS.map(({ name, price, plu }) =>
          html`<li>
            <button onclick="${handleClick(plu)}">
              Buy a ${name} (${price})
            </button>
          </li>`.key(plu)
        )}
      </ul>
    </checkout-tile>
  `,
});
