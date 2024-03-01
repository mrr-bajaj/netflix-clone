import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    modalVideo: null,
    similarVideos: null,
    modalMovieInfo: null,
    watchVideo: null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addModalVideo: (state, action) => {
      state.modalVideo = action.payload;
    },
    removeModalVideo: (state) => {
      state.modalVideo = null;
    },
    addSimilarVideos: (state, action) => {
      state.similarVideos = action.payload;
    },
    addModalMovieInfo: (state, action) => {
      state.modalMovieInfo = action.payload;
    },
    addWatchVideo : (state, action) => {
      state.watchVideo = action.payload
    }
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addModalVideo,
  removeModalVideo,
  addSimilarVideos,
  addModalMovieInfo,
  addTopRatedMovies,
  addUpcomingMovies,
  addWatchVideo
} = moviesSlice.actions;
export default moviesSlice.reducer;
