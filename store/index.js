import { define } from 'https://unpkg.com/hybrids@^7';

export * from './actions.js';
export default define({
  tag: 'app-store',
  cart: {
    get: (host, value) => JSON.parse(sessionStorage.getItem('cart')),
    set: (host, value) => {
      let val = value;

      if (val === undefined) {
        if (sessionStorage.getItem('cart') === null) {
          val = [];
          sessionStorage.setItem('cart', JSON.stringify(val));
        } else {
          val = JSON.parse(sessionStorage.getItem('cart'));
        }
      } else {
        sessionStorage.setItem('cart', JSON.stringify(val));
      }
      return val;
    },
  },
});
