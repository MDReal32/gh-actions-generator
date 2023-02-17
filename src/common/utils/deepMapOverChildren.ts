import { Children, isValidElement, ReactElement, ReactNode } from "react";

export const deepMapOverChildren = (
  children: ReactNode | ReactNode[],
  fn: (child: ReactElement) => ReactElement | void
): any => {
  return Children.map(children, child => {
    if (isValidElement(child)) {
      const ch = fn(child);
      if (ch && ch.props.children) {
        deepMapOverChildren(ch.props.children, fn);
      }
      return ch;
    }
    return child;
  });
};
