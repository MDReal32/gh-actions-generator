export interface GhActionStep {
  name: string;
  uses?: string;
  with?: Record<string, string>;
  run?: string;
}

export interface GhActionJob {
  "runs-on": string;
  "steps": GhActionStep[];
}
