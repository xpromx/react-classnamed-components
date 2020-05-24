This package is inspired by `styled-compoments` and `classnames`.

# Installation

To download `react-classnamed-components` run:

```
npm i react-classnamed-components
```

# Demo (CodeSanbox)

Visit this CodeSanbox example, where you can play with the package.

https://codesandbox.io/s/react-tailwind-classnamed-components-t5i3q?file=/src/App.js

# Getting Started

To understand the potential of this package, let's import inside our CSS the Tailwind CDN

```css
@import "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css";
```

## Simple Button

Let's create a simple button component, same as the example from Tailwind's website
https://tailwindcss.com/components/buttons/#simple

```js
import e from "react-classnamed-components"
const Button = e.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"`
```

```html
<button>Click Me!</button>
```

## Button with Props

We can use the component props to change the classNames of our component.

```js
import e from 'react-classnamed-components';
const Button = e.button(props => ["bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4",
  {
     "rounded": !props.rounded.
     "rounded-full": porps.rounded
  }
];
```

```html
<button rounded>Click Me!</button>
```

### Button With Color Variants

This is a more complex component, where we use props to change the component Colors and States.

```js
import e from "react-classnamed-components"

const ButtonVariants = {
  default: {
    border: "border-gray-600",
    text: "text-gray-600",
    bg: "bg-gray-600",
    bgHover: "hover:bg-gray-700"
  },

  red: {
    border: "border-red-600",
    text: "text-red-600",
    bg: "bg-red-600",
    bgHover: "hover:bg-red-700"
  },

  blue: {
    border: "border-blue-500",
    text: "text-blue-500",
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-700"
  }
}

const Button = e.button((props) => {
  const variant = ButtonVariants[props.variant]

  return [
    "shadow-lg font-bold py-2 px-4",
    {
      "rounded-full": props.rounded,
      [`text-white rounded ${variant.bg} ${variant.bgHover}`]: !props.outline,
      [`bg-transparent border ${variant.border} ${variant.text} ${variant.bgHover} hover:text-white `]: props.outline,
      "opacity-50 cursor-not-allowed": props.disabled
    }
  ]
})

export default Button
```

```html
<button>Click Me!</button>
<button variant="red" rounded>Click Me!</button>
<button variant="blue" outline>Click Me!</button>
<button variant="blue" disabled>Click Me!</button>
```

# ToDo

- [ ] Write tests
- [ ] Typescript support
- [ ] Examples folder of common use cases
- [ ] Refactor Code
- [ ] Own implemention of classnames package

## More Examples

- [ ] Tailwindcss
- [ ] Styled-components
- [ ] Emotion
- [ ] CSS modules
