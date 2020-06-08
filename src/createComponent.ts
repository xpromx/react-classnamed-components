import isPropValid from "@emotion/is-prop-valid";
import classNames from 'classnames';
import { createElement, Ref } from 'react';

export type Element = keyof JSX.IntrinsicElements | React.ComponentType<any>
type Props = any

export interface CreateComponent<P = {}> {
    <P = {}>(
      Element: Element,
      className: any,
      props: P & Props & { ref: Ref<any> },
      ref?: Ref<any>
    ): React.ReactElement<P>
  }
  

/**
 * Return the final component with valid DOM props
 */
export const createComponent: CreateComponent = (
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