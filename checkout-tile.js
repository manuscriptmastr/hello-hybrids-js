import { define, html } from "https://unpkg.com/hybrids@^7";

const toggleExpanded = (host) => (host.isExpanded = !host.isExpanded);

export default define({
  tag: "checkout-tile",
  collapsible: false,
  title: "Hello world!",
  id: ({ title }) => title.replaceAll(/\s/g, "-").toLowerCase(),
  isExpanded: false,
  render: ({ title, id, isExpanded }) => html`<section
    class="tile"
    aria-label="${title}"
  >
    <div class="tile-header">
      <h2>${title}</h2>
      <button
        onclick="${toggleExpanded}"
        aria-expanded="${isExpanded ? "true" : "false"}"
        aria-controls="collapse-${id}"
        aria-label="Collapse"
      >
        ${isExpanded ? "Close" : "Open"}
      </button>
    </div>
    <div id="collapse-${id}">
      ${isExpanded && html`<slot name="call-to-action"></slot>`}
      ${isExpanded &&
      html`<div class="tile-body">
        <slot></slot>
      </div>`}
    </div>
  </section>`,
});
