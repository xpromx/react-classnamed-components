import React from "react"
import classNames from "classnames"
import domElements from "./domElements"

const createComponent = (Element, className = "", props = {}) => {
  const classes = classNames(
    typeof className === "function" ? className(props) : className,
    props.className
  )
  return <Element {...props} className={classes} />
}

const getClassNames = (strs, values, props) => {
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

const constructComponent = (Element) => {
  const templateFunction = (strs, ...values) => {
    return (props) => {
      const className = getClassNames(strs, values, props)
      return createComponent(Element, className, props)
    }
  }

  templateFunction.attrs = (attrs) => {
    return (strs, ...values) => {
      return (props) => {
        const className = getClassNames(strs, values, { ...attrs, ...props })
        return createComponent(Element, className, { ...attrs, ...props })
      }
    }
  }

  return templateFunction
}

const api = (Element) => {
  return constructComponent(Element)
}

domElements.forEach((domElement) => {
  api[domElement] = constructComponent(domElement)
})

export default api
