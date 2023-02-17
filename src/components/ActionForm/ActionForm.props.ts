import { GhOnEventType } from "@/types/GhAction";

export interface Branch {
  id: string;
  name: string;
  type: GhOnEventType;
}
