import jp from "jsonpath";

import { GhAction } from "@/types/GhAction";
import { store } from "@redux/store";

export const updateJson = (json: GhAction) => {
  const state = store.getState();

  jp.apply(json, "$.on.*.branches", (branches: string[]) =>
    branches.map(branch => state.actionForm.branches.find(b => b.id === branch)!.name)
  );

  return json;
};
