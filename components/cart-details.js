import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import AppStore, { removeItemByPlu, setQuantityByPlu } from '../store/index.js';

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

export default define({
  tag: 'cart-details',
  store: parent(AppStore),
  cart: ({ store }) => store.cart,
  itemCount: ({ store }) =>
    store.cart.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0),
  title: ({ itemCount }) =>
    `Cart (${itemCount} ${itemCount === 1 ? 'Item' : 'Items'})`,
  render: ({ cart, title }) =>
    html`${styles}<checkout-tile title="${title}">
        ${!cart.length
          ? html`<p>Your cart is empty.</p>`
          : html`<ul>
              ${cart.map(({ item: { image, name, price, plu }, quantity }) =>
                html`<li>
                  <cart-row
                    image="${image}"
                    name="${name}"
                    price="${price}"
                    quantity="${quantity}"
                    onquantity="${handleQuantity(plu)}"
                    onremove="${handleRemove(plu)}"
                  />
                </li>`.key(name)
              )}
            </ul>`}
      </checkout-tile>`,
});
