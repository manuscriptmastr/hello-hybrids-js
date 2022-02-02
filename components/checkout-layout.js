import { define, html } from 'https://unpkg.com/hybrids@^7';

const styles = html`<style>
  .checkout {
    height: 100%;
    overflow-y: scroll;
  }

  main {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    align-items: center;
    background-color: var(--color-neutral-white);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    padding: var(--spacing-m);
  }

  h1 {
    font-family: 'Playfair Display';
    font-size: 3rem;
    font-weight: 400;
    margin: 0;
  }

  .body {
    background-color: var(--color-neutral-grey-5);
    display: flex;
    flex: 1;
    justify-content: center;
    padding: var(--spacing-m);
  }

  .layout {
    --threshold: 26rem;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-m);
    width: min(100%, 1100px);
  }

  /* "The Sidebar" layout from Every Layout */
  .not-sidebar {
    display: flex;
    flex-basis: 0;
    flex-direction: column;
    flex-grow: 999;
    gap: var(--spacing-m);
    min-width: 50%;
  }

  .sidebar {
    flex-basis: var(--threshold);
    flex-grow: 1;
  }
  /* End of "The Sidebar" */

  .sticky {
    position: sticky;
    top: var(--spacing-m);
  }
</style>`;

define({
  tag: 'checkout-layout',
  title: '',
  render: ({ title }) => html`<div class="checkout">
    ${styles}
    <main>
      <section class="header">
        <h1 class="title">${title}</h1>
        <slot name="subheader"></slot>
      </section>
      <section class="body">
        <div class="layout">
          <div class="not-sidebar">
            <slot></slot>
          </div>
          <aside class="sidebar">
            <div class="sticky">
              <slot name="sidebar"></slot>
            </div>
          </aside>
        </div>
      </section>
    </main>
  </div>`,
});
