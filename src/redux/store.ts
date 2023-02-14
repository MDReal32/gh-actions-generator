import { combineReducers, configureStore } from "@reduxjs/toolkit";
import "react-redux";

import GhActionJsonReducer from "./reducers/ghActionJson";

const rootReducer = combineReducers({ ghActionJson: GhActionJsonReducer });
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV
});

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
