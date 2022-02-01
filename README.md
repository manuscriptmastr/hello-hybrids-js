# Hello Web Components!

## See it in action

```shell
cd hello-web-components
npm install -g serve
serve .
```

## Concepts

1. Setting up project with native modules
2. Using `define({ tag: string, ... })`
3. Using `render()` and `html`
4. Styles: Inline or separate declaration
5. Nested templates: slots (different! Also always need closing tags)
6. Store: as a plain object with `store.get(id)`
7. Store: as a DOM component (Dev Tools)
8. Events
9. Testing
10. Pros
    1. Easily get reference to store or DOM by ID. It's just an object or a DOM node. Which means you can easily inspect those values.
    2. Low-level, unopinionated, flexible API's let you write in different styles
    3. Computed props like Vue are delightfully easy to write, but pure unlike Vue
    4. Need a store or context? You can define a store component wrapper like React
    5. Named slots are wonderful, reminds me of Vue but it's the actual web
    6. Lots of functions and explicit arguments like `host` makes refactoring so darn easy
    7. Writing HTML feels just like writing JSX in React. No custom for-loop or if...else constructs, no directives. It's just JavaScript or HTML
    8. You can pass down a handler like React, or emit a custom event like Vue or Angular. Your choice! It's flexible.
11. Cons
    1. Defining props feels a little clumsy, particular if they are primitives
    2. `html` util feels like it's doing too much. There's `html.resolve()`, `html.css()`, etc. These interfaces feel a little faddy/fragile.
12. Not sure
    1. Referring to object/DOM ID's is both interesting and weird, but it's at least vanilla!
