interface Branch {
  name: string;
}

interface GHActionAction {
  branches?: (Branch | string)[];
}

interface GHActionOn {
  push?: GHActionAction | null;
  pull_request?: GHActionAction | null;
}

export interface GHAction {
  name: string;
  on: GHActionOn;
}
