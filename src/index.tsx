import { createElement, forwardRef } from "react"
import isPropValid from "@emotion/is-prop-valid"
import classNames from "classnames"
import domElements from "./domElements"
import {
  API,
  CreateComponent,
  DomElement,
  GetClassNames,
  TF,
  ConstructComponent,
  ForwardRefFn
} from "./types"

/**
 * Return the final component with valid DOM props
 */
const createComponent: CreateComponent = (
  Element,
  className = "",
  props = {},
  ref
) => {
  const classes = classNames(
    typeof className === "function" ? className(props) : className,
    props.className
  )

  const propsForElement = {}
  for (const key in props) {
    if (isPropValid(key)) {
      // @ts-ignore
      propsForElement[key] = props[key]
    }
  }

  return createElement(Element, {
    ...propsForElement,
    className: classes,
    ref
  })
}

/**
 * Get the final classNames for the component
 */
const getClassNames: GetClassNames = (strs, values, props) => {
  if (typeof strs === "string") {
    return strs
  }

  if (typeof strs === "function") {
    return strs(props)
  }

  const className = []

  for (let index = 0; index < strs.length; index++) {
    const expr = values[index]
    const value = typeof expr === "function" ? expr(props) : expr
    className.push(strs[index], value)
  }

  return className
}

/**
 * Component Constructor
 */
const constructComponent: ConstructComponent = (Element) => {
  const templateFunction: TF = (strs, ...values) => {
    return forwardRef((props, ref) => {
      const className = getClassNames(strs, values, props)
      return createComponent(Element, className, props, ref)
    }) as ForwardRefFn<any>
  }

  templateFunction.attrs = (attrs) => {
    return (strs, ...values) => {
      return forwardRef((props, ref) => {
        const className = getClassNames(strs, values, { ...attrs, ...props })
        return createComponent(Element, className, { ...attrs, ...props, ref })
      }) as ForwardRefFn<any>
    }
  }

  return templateFunction
}

/**
 * Main Object
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore: Unreachable code error
const api: API = (Element) => {
  return constructComponent(Element)
}

/**
 * Create Shortcut for each DOM Element
 */
;(domElements as DomElement[]).forEach((domElement) => {
  api[domElement] = constructComponent(domElement)
})

export default api
