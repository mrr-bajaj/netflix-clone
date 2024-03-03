import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    path: "",
    showProfile: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    updatePath: (state, action) => {
      state.path = action.payload;
    },
    showAddProfile: (state, action) => {
      state.showProfile = action.payload;
    },
  },
});

export const { changeLanguage, updatePath, showAddProfile } =
  configSlice.actions;
export default configSlice.reducer;
