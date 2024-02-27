import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    path: "",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    updatePath: (state, action) => {
      state.path = action.payload;
    },
  },
});

export const { changeLanguage, updatePath } = configSlice.actions;
export default configSlice.reducer;
