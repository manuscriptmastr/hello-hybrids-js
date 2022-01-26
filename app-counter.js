import { html, define } from 'https://unpkg.com/hybrids@^7';
import { curry } from 'https://unpkg.com/ramda@0.28.0/es';

// Day 2
const setCount = curry((set, host) => {
  const newCount = set(host.count);
  if (newCount >= 0) host.count = newCount;
});

define({
  tag: 'app-counter',
  count: 0,
  render: ({ count }) => html`
    <style>
      h2 {
        color: red;
        font-size: 2rem;
      }
    </style>
    <div>
      <button onclick="${setCount(c => c + 1)}">Increment</button>
      <h2>${count}</h2>
      <button onclick="${setCount(c => c - 1)}">Decrement</button>
    </div>
  `
});