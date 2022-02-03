import { define, dispatch, html } from 'https://unpkg.com/hybrids@^7';

const styles = html`<style></style>`;

const handleInput = (host, event) =>
  dispatch(host, 'update', { detail: event.target.value });

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
