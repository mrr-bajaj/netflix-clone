import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    profiles: [],
    myList: [],
  },
  reducers: {
    addUserEmail: (state, action) => {
      state.email = action.payload;
    },
    removeUser: (state, action) => {
      return {
        email: null,
        profiles: [],
        myList: [],
      };
    },
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
    addMyList: (state, action) => {
      state.myList.push(action.payload);
    },
    removeMyList: (state, action) => {
      state.myList = state.myList.filter((list) => list.id !== action.payload);
    },
  },
});

export const { addUserEmail, removeUser, addProfile, addMyList, removeMyList } =
  userSlice.actions;
export default userSlice.reducer;
