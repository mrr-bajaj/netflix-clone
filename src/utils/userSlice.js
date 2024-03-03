import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    profiles: [],
  },
  reducers: {
    addUserEmail: (state, action) => {
      state.email = action.payload;
    },
    removeUser: (state, action) => {
      return {
        email: null,
        profiles: [],
      };
    },
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
  },
});

export const { addUserEmail, removeUser, addProfile } = userSlice.actions;
export default userSlice.reducer;
