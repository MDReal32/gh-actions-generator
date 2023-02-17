import { FC } from "react";

export interface AddableListProps<T> {
  list: T[];
  render: FC<RendererItem<T>>;
  label?: string;
  onChange?: (item: T[]) => void;
  isSetId?: boolean;
}

export interface RendererItem<T = any> {
  item: T;
  index: number;
}
