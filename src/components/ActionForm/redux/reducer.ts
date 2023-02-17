import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@redux/store";
import { removeOnValue } from "@components/ActionView/redux/reducer";

import { Branch } from "../ActionForm.props";
import { ghOnEventTypes } from "@common/constant";

interface Slice {
  branches: Branch[];
}

const initialState: Slice = {
  branches: []
};

export const removeBranch = createAsyncThunk(
  "actionForm/removeBranch",
  (index: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const branch = state.actionForm.branches[index].name;
    ghOnEventTypes.forEach(event => {
      thunkAPI.dispatch(removeOnValue([event, "branches", branch]));
    });
    return index;
  }
);

const slice = createSlice({
  name: "actionForm",
  initialState,
  reducers: {
    addBranch(state, action: PayloadAction<Branch>) {
      state.branches.push(action.payload);
      localStorage.setItem("branches", JSON.stringify(state.branches));
    },
    setBranches(state, action: PayloadAction<Branch[]>) {
      state.branches = action.payload;
      localStorage.setItem("branches", JSON.stringify(state.branches));
    }
  },
  extraReducers(builder) {
    builder
      .addCase("@@INIT", () => {
        const branches = localStorage.getItem("branches");
        if (branches) {
          const data = JSON.parse(branches);
          return { branches: data };
        }
      })
      .addCase(removeBranch.fulfilled, (state, action) => {
        state.branches.splice(action.payload, 1);
        localStorage.setItem("branches", JSON.stringify(state.branches));
      });
  }
});

export const { addBranch, setBranches } = slice.actions;
export default slice.reducer;
