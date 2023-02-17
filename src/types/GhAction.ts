import { GhActionJob } from "./GhActionJob";

export interface Branch {
  name: string;
}

export interface GhActionAction {
  branches?: (Branch | string)[];
}

export type GhOnEventType = "push" | "pull_request";

export type GhActionOn = Partial<Record<GhOnEventType, GhActionAction | null>>;

export interface GhAction {
  name: string;
  on: GhActionOn;
  jobs: Record<string, GhActionJob>;
}
