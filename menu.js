import { define, html, store } from 'https://unpkg.com/hybrids@^7';
import ITEMS from './items.js';
import GlobalState from './store.js';

const addToCartByPlu = (plu, cart) => {
  const item = ITEMS.find((item) => item.plu === plu);
  const newCart = cart.find(({ item }) => item.plu === plu)
    ? cart.map(({ item, quantity, ...rest }) =>
        item.plu === plu
          ? { item, quantity: quantity + 1, ...rest }
          : { item, quantity, ...rest }
      )
    : [...cart, { item, quantity: 1 }];

  store.set(GlobalState, {
    cart: newCart,
  });
};

define({
  tag: 'app-menu',
  cart: () => store.get(GlobalState).cart,
  render: ({ cart }) => html`
    <h2>Choose from the following:</h2>
    <ul>
      ${ITEMS.map(({ name, price, plu }) =>
        html`<li>
          <button onclick="${() => addToCartByPlu(plu, cart)}">
            Buy a ${name} (${price})
          </button>
        </li>`.key(plu)
      )}
    </ul>
  `,
});
