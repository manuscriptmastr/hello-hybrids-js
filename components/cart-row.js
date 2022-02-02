import { define, dispatch, html } from 'https://unpkg.com/hybrids@^7';
import { range } from 'https://unpkg.com/ramda@0.28.0/es';

const styles = html`<style>
  article {
    align-items: center;
    border: 1px solid var(--color-neutral-grey-10);
    border-radius: var(--spacing-xs);
    display: flex;
    gap: var(--spacing-xs);
    padding: var(--spacing-s);
  }

  img {
    aspect-ratio: 1 / 1;
    border-radius: var(--spacing-xs);
    object-fit: cover;
    display: block;
    width: 6rem;
  }

  h3 {
    font-family: 'Playfair Display';
    font-weight: 400;
    margin: 0;
    text-transform: uppercase;
  }

  button {
    margin-left: auto;
  }
</style>`;

const handleSelect = (host, event) =>
  dispatch(host, 'quantity', { detail: parseInt(event.target.value, 10) });

const handleRemove = (host, event) => dispatch(host, 'remove');

define({
  tag: 'cart-row',
  image: '',
  name: '',
  price: '$0.00',
  quantity: 0,
  render: ({ image, name, price, quantity }) =>
    html`${styles}
      <article>
        <img src="${image}" alt="${name}" />
        <h3>${name}: ${price}</h3>
        <select value="${quantity}" onchange="${handleSelect}">
          ${range(1, 11).map(
            (opt) => html`<option value="${opt}">${opt}</option>`
          )}</select
        ><button onclick="${handleRemove}">x</button>
      </article>`,
});
