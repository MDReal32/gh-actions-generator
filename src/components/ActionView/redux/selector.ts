import { RootState } from "@redux/store";

export const getJson = (state: RootState) => state.ghActionJson.json;
