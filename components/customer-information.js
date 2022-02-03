import { define, html } from 'https://unpkg.com/hybrids@^7';
import { all } from 'https://unpkg.com/ramda@0.28.0/es';

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

export default define({
  tag: 'customer-information',
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  valid: ({ firstName, lastName, emailAddress, phoneNumber }) =>
    all((x) => x.length, [firstName, lastName, emailAddress, phoneNumber]),
  render: ({ firstName, lastName, emailAddress, phoneNumber, valid }) =>
    html`${styles}<checkout-tile title="Customer Information">
        <form>
          <h2>${valid ? 'Valid' : 'Invalid'}</h2>
          <form-input
            label="First Name"
            value="${firstName}"
            onupdate="${(host, { detail }) => (host.firstName = detail)}"
          ></form-input>
          <form-input
            label="Last Name"
            value="${lastName}"
            onupdate="${(host, { detail }) => (host.lastName = detail)}"
          ></form-input>
          <form-input
            label="Email Address"
            type="email"
            value="${emailAddress}"
            onupdate="${(host, { detail }) => (host.emailAddress = detail)}"
          ></form-input>
          <form-input
            label="Phone Number"
            type="tel"
            value="${phoneNumber}"
            onupdate="${(host, { detail }) => (host.phoneNumber = detail)}"
          ></form-input>
        </form>
      </checkout-tile>`,
});
