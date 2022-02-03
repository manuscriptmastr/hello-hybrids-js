import { define, dispatch, html } from 'https://unpkg.com/hybrids@^7';

const styles = html`<style>
  @import 'global.css';

  input {
    border: 1px solid var(--color-neutral-grey-10);
    border-radius: var(--spacing-xs);
    color: var(--color-neutral-black);
    font-family: inherit;
    font-size: inherit;
    padding: var(--spacing-s);
    width: 100%;
  }

  input::placeholder {
    color: var(--color-neutral-grey-50);
  }
</style>`;

const handleInput = (host, event) =>
  dispatch(host, 'update', { detail: event.target.value });

const CLEAVE_OPTIONS = {
  tell: {
    phone: true,
    phoneRegionCode: 'US',
    delimiter: '-',
  },
};

export default define({
  tag: 'form-input',
  label: '',
  type: 'text',
  value: '',
  render: ({ label, type, value }) =>
    html`${styles}
      <input
        type="${type}"
        value="${value}"
        placeholder="${label}"
        oninput="${handleInput}"
      />`,
});
