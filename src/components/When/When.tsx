import { FC, PropsWithChildren } from "react";
import { WhenProps } from "@components/When/When.props";

export const When = <T extends boolean>({
  condition,
  children
}: PropsWithChildren<WhenProps<T>>): T extends true
  ? ReturnType<FC<PropsWithChildren<WhenProps<T>>>>
  : null => {
  // @ts-ignore
  return condition ? <>{children}</> : null;
};
