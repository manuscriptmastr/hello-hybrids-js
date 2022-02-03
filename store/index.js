import { children, define } from 'https://unpkg.com/hybrids@^7';
import CustomerInformation from '../components/customer-information.js';
import { sessionStore } from '../utils/storage.js';

export * from './actions.js';
export default define({
  tag: 'app-store',
  cart: sessionStore('cart', []),
  customerInformation: children(CustomerInformation, { deep: true }),
  valid: ({ cart, customerInformation }) =>
    cart.length && (customerInformation[0] || { valid: false }).valid,
});
