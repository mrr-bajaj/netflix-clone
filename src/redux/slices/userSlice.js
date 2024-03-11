import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    profiles: [],
    myList: [],
    activeProfileId: null,
    viewedMovies: [],
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
        activeProfileId: null,
        viewedMovies: [],
      };
    },
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
    addAllProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    addMyList: (state, action) => {
      state.myList.push(action.payload);
    },
    addAllMyList: (state, action) => {
      state.myList = action.payload;
    },
    removeMyList: (state, action) => {
      state.myList = state.myList.filter((list) => list.id !== action.payload);
    },
    clearMyList: (state, action) => {
      state.myList = [];
    },
    addActiveProfileId: (state, action) => {
      state.activeProfileId = action.payload;
    },
    removeActiveProfileId: (state) => {
      state.activeProfileId = null;
    },
    addViewedMovie: (state, action) => {
      state.viewedMovies.push(action.payload);
    },
    addAllViewedMovies: (state, action) => {
      state.viewedMovies = action.payload;
    },
  },
});

export const {
  addUserEmail,
  removeUser,
  addProfile,
  addMyList,
  removeMyList,
  addActiveProfileId,
  addAllProfiles,
  addAllMyList,
  removeActiveProfileId,
  clearMyList,
  addViewedMovie,
  addAllViewedMovies,
} = userSlice.actions;
export default userSlice.reducer;
