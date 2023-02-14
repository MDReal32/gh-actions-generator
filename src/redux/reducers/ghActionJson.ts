import { createSlice } from "@reduxjs/toolkit";

import type { GhAction } from "@types/GhAction";

interface Slice {
  json: GhAction;
}

const initialState: Slice = {
  json: {
    name: "Link Checker: All English",
    on: {
      push: {
        branches: ["master"]
      },
      pull_request: null
    },
    jobs: {
      "check-links": {
        "runs-on":
          "${{ fromJSON('['ubuntu-latest', 'self-hosted']')[github.repository == 'github/docs-internal'] }}",
        "steps": [
          { name: "Checkout", uses: "actions/checkout@v3" },
          {
            name: "Setup Node",
            uses: "actions/setup-node@v3",
            with: { "node-version": "16.13.x", "cache": "npm" }
          },
          { name: "Install", run: "npm ci" },
          {
            name: "Gather files changed",
            uses: "trilom/file-changes-action@a6ca26c14274c33b15e6499323aac178af06ad4b",
            with: { fileOutput: "json" }
          },
          { name: "Show files changed", run: "cat $HOME/files.json" },
          {
            name: "Link check (warnings, changed files)",
            run: "node ./script/rendered-content-link-checker.mjs \\\n  --language en \\\n  --max 100 \\\n  --check-anchors \\\n  --check-images \\\n  --verbose \\\n  --list $HOME/files.json"
          },
          {
            name: "Link check (critical, all files)",
            run: "node ./script/rendered-content-link-checker.mjs \\\n  --language en \\\n  --exit \\\n  --verbose \\\n  --check-images \\\n  --level critical"
          }
        ]
      }
    }
  }
};

const slice = createSlice({
  name: "GhActionJson",
  initialState,
  reducers: {
    setJson(state, action: { payload: GhAction }) {
      state.json = action.payload;
    }
  }
});

export const { setJson } = slice.actions;
export default slice.reducer;
