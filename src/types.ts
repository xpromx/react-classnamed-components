import React, { ComponentProps, ElementType, FC, ReactElement } from "react";
import { DomElement } from './domElements';

type Element = ElementType;

export type ForwardRefFn<R> = <P = {}>(
  props: P & React.RefAttributes<R>
) => ReactElement | null


export interface HOC<P = {}, E extends Element = "div"> {
  <P = {}>(strs: any, values?: any): FC<P & ComponentProps<E>>
  attrs: {
    <P = {}>(attrs: any): {
      <P = {}>(strs: any, values?: any): FC<P & ComponentProps<E>>
    }
  }
  displayName: string
}
export interface ConstructComponent<P = {}> {
  <P = {}, E extends Element = "div">(Element: E): HOC<P, E>
}

type APIComponents<P = {}> = {
  [Element in DomElement]: HOC<P, Element>
}

export interface API<P = {}> extends APIComponents<P> {
  <E extends Element, P = {}>(Element: E): HOC<P, E>
}
