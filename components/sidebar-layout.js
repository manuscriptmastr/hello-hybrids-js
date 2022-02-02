import { define, html } from 'https://unpkg.com/hybrids@^7';

const styles = ({ gap, threshold }) => html`<style>
  /* Adapted from "The Sidebar" layout from Every Layout */
  .layout {
    --threshold: ${threshold};
    --gap: ${gap};
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    width: 100%;
  }

  .not-sidebar {
    flex-basis: 0;
    flex-grow: 999;
    min-width: 50%;
  }

  .sidebar {
    flex-basis: var(--threshold);
    flex-grow: 1;
  }
</style>`;

define({
  tag: 'sidebar-layout',
  threshold: '32ch',
  gap: '0',
  render: ({ gap, threshold }) => html`${styles({ gap, threshold })}
    <div class="layout">
      <div class="not-sidebar">
        <slot></slot>
      </div>
      <aside class="sidebar">
        <slot name="sidebar"></slot>
      </aside>
    </div>`,
});
