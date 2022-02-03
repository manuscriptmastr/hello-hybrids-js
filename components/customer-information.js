import { define, html } from 'https://unpkg.com/hybrids@^7';
import { all } from 'https://unpkg.com/ramda@0.28.0/es';

const styles = html`<style></style>`;

export default define({
  tag: 'customer-information',
  firstName: '',
  lastName: '',
  emailAddress: '',
  valid: ({ firstName, lastName, emailAddress }) =>
    all((x) => x.length, [firstName, lastName, emailAddress]),
  render: ({ firstName, lastName, emailAddress, valid }) =>
    html`${styles}<checkout-tile title="Customer Information">
        <form>
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
        </form>
      </checkout-tile>`,
});
