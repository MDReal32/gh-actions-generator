import { combineReducers, configureStore } from "@reduxjs/toolkit";
import "react-redux";

import ActionViewReducer from "@/components/ActionView/redux/reducer";
import ActionFormReducer from "@/components/ActionForm/redux/reducer";

const rootReducer = combineReducers({
  actionView: ActionViewReducer,
  actionForm: ActionFormReducer
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV
});

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
