import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';
import ITEMS from '../items.js';
import AppStore, { addItemByPlu } from './store.js';

const styles = html`<style>
  ul {
    display: grid;
    gap: var(--spacing-s);
    grid-template-columns: repeat(auto-fit, minmax(Min(10rem, 100%), 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    aspect-ratio: 1/1;
    display: block;
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
  }

  article > * {
    backdrop-filter: blur(0.25rem);
    position: relative;
  }

  img {
    border-radius: var(--spacing-xs);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  h3 {
    color: var(--color-neutral-white);
    margin: 0;
  }
</style>`;

const handleClick = curry((plu, { store }) => addItemByPlu(store, plu));

define({
  tag: 'app-menu',
  store: parent(AppStore),
  items: ({ store }) =>
    ITEMS.map(({ plu, ...rest }) => ({
      plu,
      disabled: store.cart.map(({ item: { plu } }) => plu).includes(plu),
      ...rest,
    })),
  render: ({ items }) => html`${styles}
    <checkout-tile title="Menu">
      <h2>Choose from the following:</h2>
      <ul>
        ${items.map(({ disabled, image, name, price, plu }) =>
          html`<li>
            <article>
              <img src="${image}" alt="${name}" />
              <h3>${name}</h3>
              <button disabled="${disabled}" onclick="${handleClick(plu)}">
                Buy (${price})
              </button>
            </article>
          </li>`.key(plu)
        )}
      </ul>
    </checkout-tile> `,
});
