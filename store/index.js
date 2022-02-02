import { define } from 'https://unpkg.com/hybrids@^7';
import { sessionStore } from '../utils/storage.js';

export * from './actions.js';
export default define({
  tag: 'app-store',
  cart: sessionStore('cart', []),
});
