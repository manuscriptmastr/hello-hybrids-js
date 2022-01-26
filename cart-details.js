import { define, html, store } from "https://unpkg.com/hybrids@^7";
import GlobalState from "./store.js";

define({
  tag: "cart-details",
  items: () => store.get(GlobalState).items,
  render: ({ items }) => html`
    <ul>
      ${items.map(({ name, price }) => html`<li>${name}: ${price}</li>`)}
    </ul>
  `,
});
