import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
    profiles: [],
  },
  reducers: {
    addUser: (state, action) => {
      const { displayName, email, photoURL, uid } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.photoURL = photoURL;
      state.uid = uid;
      //   return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
  },
});

export const { addUser, removeUser, addProfile } = userSlice.actions;
export default userSlice.reducer;
