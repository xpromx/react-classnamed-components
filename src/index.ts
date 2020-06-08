import { ElementType, forwardRef } from 'react';
import { getClassNames } from './classNames';
import { createComponent } from './createComponent';
import { domElements } from './domElements';
import { API, ConstructComponent, ForwardRefFn, HOC } from './types';

const getDisplayName = (Element: ElementType) => typeof Element === 'string' ? Element : Element.displayName || Element.name

const classnamed: ConstructComponent = (Element) => {

  const HOC: HOC = (strs, ...values) => {
      return forwardRef((props, ref) => {
          const className = getClassNames(strs, values, props)
          return createComponent(Element, className, props, ref)
        }) as ForwardRefFn<any>
  } 

  HOC.attrs = (attrs) => {
      return (strs, ...values) => {
        return forwardRef((props, ref) => {
          const className = getClassNames(strs, values, { ...attrs, ...props })
          return createComponent(Element, className, { ...attrs, ...props, ref })
        }) as ForwardRefFn<any>
      }
  }

  HOC.displayName = `classnamed(${getDisplayName(Element)})`

  return HOC;
    
}

domElements.forEach(Element => {
  classnamed[Element] = classnamed(Element)
})
  
export default classnamed as API;