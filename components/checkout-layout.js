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
    text-transform: uppercase;
  }

  .body {
    background-color: var(--color-neutral-grey-5);
    display: flex;
    flex: 1;
    justify-content: center;
    padding: var(--spacing-m);
  }

  sidebar-layout {
    width: min(100%, 1100px);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
  }

  .sticky {
    position: sticky;
    top: var(--spacing-m);
  }
</style>`;

export default define({
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
        <sidebar-layout gap="var(--spacing-m)" threshold="26rem">
          <div class="content">
            <slot></slot>
          </div>
          <div slot="sidebar" class="sticky">
            <slot name="sidebar"></slot>
          </div>
        </sidebar-layout>
      </section>
    </main>
  </div>`,
});
