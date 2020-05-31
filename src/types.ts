import React, { FC, ComponentProps, Ref, ReactElement } from "react"
type Props = any
export type Element = keyof JSX.IntrinsicElements | React.ComponentType<any>
export type DomElement = keyof JSX.IntrinsicElements
export type ForwardRefFn<R> = <P = {}>(
  props: P & React.RefAttributes<R>
) => ReactElement | null

export interface CreateComponent<P = {}> {
  <P = {}>(
    Element: Element,
    className: any,
    props: P & Props & { ref: Ref<any> },
    ref?: any
  ): React.ReactElement<P>
}

export interface GetClassNames {
  (strs: string | string[] | Function, values?: any, props?: any): string
}

export interface TF<P = {}, E extends Element = "div"> {
  <P = {}>(strs: any, values?: any): FC<P & ComponentProps<E>>
  attrs: {
    <P = {}>(attrs: any): {
      <P = {}>(strs: any, values?: any): FC<P & ComponentProps<E>>
    }
  }
}
export interface ConstructComponent<P = {}> {
  <P = {}, E extends Element = "div">(Element: E): TF<P, E>
}

type APIComponents<P = {}> = {
  [Element in DomElement]: TF<P, Element>
}

export interface API<P = {}> extends APIComponents<P> {
  <E extends Element, P = {}>(Element: E): TF<P, E>
}
