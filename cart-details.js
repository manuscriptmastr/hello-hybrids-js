import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import AppStore, { removeItemByPlu, setQuantityByPlu } from './store.js';

const styles = html`<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: block;
  }
</style>`;

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
  render: ({ cart }) => html`${styles}<checkout-tile title="Cart Details">
      <ul>
        ${cart.map(({ item: { name, price, plu }, quantity }) =>
          html`<li>
              <cart-row
                name="${name}"
                price="${price}"
                quantity="${quantity}"
                onquantity="${handleQuantity(plu)}"
                onremove="${handleRemove(plu)}"
              />
            </li>

            <li></li>`.key(name)
        )}
      </ul>
    </checkout-tile>`,
});
