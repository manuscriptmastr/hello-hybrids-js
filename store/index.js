import { define } from 'https://unpkg.com/hybrids@^7';
import { sessionStore } from '../utils/storage.js';
import { all } from 'https://unpkg.com/ramda@0.28.0/es';

export * from './actions.js';
export default define({
  tag: 'app-store',
  cart: sessionStore('cart', []),
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  valid: ({ cart, firstName, lastName, emailAddress, phoneNumber }) =>
    !!cart.length &&
    all((x) => x.length, [firstName, lastName, emailAddress, phoneNumber]),
});
