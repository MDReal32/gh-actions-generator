import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { GhAction, GhOnEventType } from "@/types/GhAction";

import { InitialState } from "../ActionView.props";

const initialState: InitialState = {
  json: {
    name: "",
    on: {},
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
    setJson(state, action: PayloadAction<GhAction>) {
      state.json = action.payload;
      localStorage.setItem("gh-actions", JSON.stringify(state.json));
    },
    setName(state, action: PayloadAction<string>) {
      state.json.name = action.payload;
      localStorage.setItem("gh-actions", JSON.stringify(state.json));
    },
    setOnValue(state, action: PayloadAction<[GhOnEventType, "branches", string]>) {
      state.json.on[action.payload[0]] ||= {};
      state.json.on[action.payload[0]]![action.payload[1]] ||= [];
      state.json.on[action.payload[0]]![action.payload[1]]!.push(action.payload[2]);

      localStorage.setItem("gh-actions", JSON.stringify(state.json));
    },
    removeOnValue(state, action: PayloadAction<[GhOnEventType, "branches", string]>) {
      state.json.on[action.payload[0]] ||= {};
      state.json.on[action.payload[0]]![action.payload[1]] ||= [];
      const index = state.json.on[action.payload[0]]![action.payload[1]]!.indexOf(
        action.payload[2]
      );
      if (index > -1) state.json.on[action.payload[0]]![action.payload[1]]!.splice(index, 1);
      if (state.json.on[action.payload[0]]![action.payload[1]]!.length === 0)
        delete state.json.on[action.payload[0]]![action.payload[1]];
      if (Object.keys(state.json.on[action.payload[0]]!).length === 0)
        delete state.json.on[action.payload[0]];

      localStorage.setItem("gh-actions", JSON.stringify(state.json));
    }
  },
  extraReducers(builder) {
    builder.addCase("@@INIT", () => {
      const json = localStorage.getItem("gh-actions");
      if (json) {
        const data = JSON.parse(json);
        return { json: data };
      }
    });
  }
});

export const { setJson, setName, setOnValue, removeOnValue } = slice.actions;
export default slice.reducer;
