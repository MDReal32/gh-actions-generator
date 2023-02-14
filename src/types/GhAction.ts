import { GhActionJob } from "./GhActionJob";

interface Branch {
  name: string;
}

interface GhActionAction {
  branches?: (Branch | string)[];
}

interface GhActionOn {
  push?: GhActionAction | null;
  pull_request?: GhActionAction | null;
}

export interface GhAction {
  name: string;
  on: GhActionOn;
  jobs: Record<string, GhActionJob>;
}
