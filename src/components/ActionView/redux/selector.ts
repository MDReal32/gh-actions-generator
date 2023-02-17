import { cloneDeep } from "lodash";

import { RootState } from "@redux/store";
import { updateJson } from "@components/ActionView/utils/updateJson";

export const getUpdatedJson = (state: RootState) => updateJson(cloneDeep(state.actionView.json));
export const getJson = (state: RootState) => state.actionView.json;
export const getActionName = (state: RootState) => state.actionView.json.name;
export const getActionOn = (state: RootState) => state.actionView.json.on;
export const getActionJobs = (state: RootState) => state.actionView.json.jobs;
