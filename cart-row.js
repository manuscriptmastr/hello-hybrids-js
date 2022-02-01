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

  h3 {
    margin: 0;
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
  name: '',
  quantity: 0,
  price: '$0.00',
  render: ({ name, quantity, price }) =>
    html`${styles}
      <article>
        <h3>${name}: ${price}</h3>
        <select value="${quantity}" onchange="${handleSelect}">
          ${range(1, 11).map(
            (opt) => html`<option value="${opt}">${opt}</option>`
          )}</select
        ><button onclick="${handleRemove}">x</button>
      </article>`,
});
