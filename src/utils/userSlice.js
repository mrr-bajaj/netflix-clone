import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    profiles: [],
  },
  reducers: {
    addUser: (state, action) => {
      const { email, profiles } = action.payload;
      return {
        ...state,
        email,
        profiles,
      };
      //DOUBT
      // state.displayName = displayName;
      // state.email = email;
      // state.photoURL = photoURL;
      // state.uid = uid;
      //   return action.payload;
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

export const { addUser, removeUser, addProfile } = userSlice.actions;
export default userSlice.reducer;
