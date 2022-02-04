import Cleave from 'https://cdn.jsdelivr.net/npm/cleave.js@1.6.0/dist/cleave-esm.min.js';
import 'https://cdn.jsdelivr.net/npm/cleave.js@1.6.0/dist/addons/cleave-phone.us.js';
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

const CLEAVE_OPTIONS = {
  tel: {
    phone: true,
    phoneRegionCode: 'US',
    delimiter: '-',
  },
};

const handleInput = (host, event) =>
  dispatch(host, 'input', { detail: event.target.value });

export const autoformat = {
  connect: (host, key, invalidate) => {
    const getInput = (host) => host.shadowRoot.querySelector('input');

    setTimeout(() => {
      const OPTIONS = CLEAVE_OPTIONS[host.type];
      if (OPTIONS) {
        getInput(host)['cleave'] = new Cleave(getInput(host), {
          ...OPTIONS,
          onValueChanged: (value) => handleInput(host, value),
        });
      } else {
        getInput(host).addEventListener('input', (event) =>
          handleInput(host, event)
        );
      }
    }, 0);

    return () => {
      (getInput(host)['cleave'] || { destroy: () => {} }).destroy();
      getInput(host).removeEventListener('input', (event) =>
        handleInput(host, event)
      );
    };
  },
  get: (host, value) => value || 'text',
  set: (host, value) => value,
};

export default define({
  tag: 'form-input',
  label: '',
  type: autoformat,
  value: '',
  render: ({ label, type, value }) =>
    html`${styles}
      <input
        type="${type}"
        value="${value}"
        placeholder="${label}"
        oninput="${(host, event) => event.stopPropagation()}"
      />`,
});
