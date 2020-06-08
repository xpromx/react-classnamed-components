interface GetClassNames {
    (strs: string | string[] | Function, values?: any, props?: any): string
}

/**
 * Get the final classNames for the component
 */
export const getClassNames: GetClassNames = (strs, values, props) => {
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