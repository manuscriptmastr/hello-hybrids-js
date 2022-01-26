import { html, define } from 'https://unpkg.com/hybrids@^7';

// Day 1
define({
  tag: 'app-clock',
  time: {
    get: () => Date.now(),
    set: () => Date.now(),
    connect: (host) => {
      const timer = setInterval(() => { host.time = Date.now() }, 1000);
      return () => clearInterval(timer);
    }
  },
  render: ({ time }) => html`
    <span>${time}</span>
  `
});
