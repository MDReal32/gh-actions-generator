import { combineReducers, configureStore } from "@reduxjs/toolkit";
import "react-redux";

import XReducer from "./reducers/x";

const rootReducer = combineReducers({ x: XReducer });
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV
});

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
