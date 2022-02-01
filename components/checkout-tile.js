import { define, html } from 'https://unpkg.com/hybrids@^7';

const styles = html`<style lang="scss" scoped>
  .tile {
    background-color: var(--color-neutral-white);
    border-radius: var(--spacing-xs);
    box-shadow: 0 0.25rem 1rem 0 rgba(235, 232, 227, 0.8);
    overflow: hidden;
  }

  .tile > * + * {
    border-top: 1px solid var(--color-neutral-grey-10);
  }

  .tile-header {
    align-items: center;
    display: flex;
    gap: var(--spacing-s);
    justify-content: space-between;
    padding: var(--spacing-m);
  }

  h2 {
    color: var(--color-neutral-black);
    font-size: 1.5rem;
    margin: 0;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;
  }

  .tile-collapse {
    color: var(--color-neutral-black);
    height: var(--spacing-m);
    width: var(--spacing-m);
  }

  .tile-body {
    padding: var(--spacing-m);
  }
</style>`;

const toggleExpanded = (host) => (host.isExpanded = !host.isExpanded);

define({
  tag: 'checkout-tile',
  collapsible: false,
  title: '',
  id: ({ title }) => title.replaceAll(/\s/g, '-').toLowerCase(),
  isExpanded: true,
  render: ({ title, id, isExpanded }) => html` ${styles}
    <section class="tile" aria-labelledby="checkout-tile-${id}">
      <div class="tile-header">
        <h2 id="checkout-tile-${id}">${title}</h2>
        <button
          onclick="${toggleExpanded}"
          aria-expanded="${isExpanded ? 'true' : 'false'}"
          aria-controls="collapse-${id}"
          aria-label="Collapse"
        >
          ${isExpanded ? 'Close' : 'Open'}
        </button>
      </div>
      <div id="collapse-${id}">
        ${isExpanded && html`<slot name="call-to-action"></slot>`}
        ${isExpanded &&
        html`<div class="tile-body">
          <slot></slot>
        </div>`}
      </div>
    </section>`,
});
