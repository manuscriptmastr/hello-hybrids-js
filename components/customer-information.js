import { define, html, parent } from 'https://unpkg.com/hybrids@^7';
import { curry, path } from 'https://unpkg.com/ramda@0.28.0/es';
import AppStore from '../store/index.js';

const styles = html`<style>
  @import 'global.css';

  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
  }

  form-input {
    width: 100%;
  }
</style>`;

const handleInput = curry((name, { store }, { detail }) => {
  store[name] = detail;
});

export default define({
  tag: 'customer-information',
  store: parent(AppStore),
  firstName: path(['store', 'firstName']),
  lastName: path(['store', 'lastName']),
  emailAddress: path(['store', 'emailAddress']),
  phoneNumber: path(['store', 'phoneNumber']),
  render: ({ firstName, lastName, emailAddress, phoneNumber }) =>
    html`${styles}<checkout-tile title="Customer Information">
        <form>
          <form-input
            label="First Name"
            value="${firstName}"
            oninput="${handleInput('firstName')}"
          ></form-input>
          <form-input
            label="Last Name"
            value="${lastName}"
            oninput="${handleInput('lastName')}"
          ></form-input>
          <form-input
            label="Email Address"
            type="email"
            value="${emailAddress}"
            oninput="${handleInput('emailAddress')}"
          ></form-input>
          <form-input
            label="Phone Number"
            type="tel"
            value="${phoneNumber}"
            oninput="${handleInput('phoneNumber')}"
          ></form-input>
        </form>
      </checkout-tile>`,
});
