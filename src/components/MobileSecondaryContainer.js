import React from "react";
import { useSelector } from "react-redux";
import MobileMovieList from "./MobileMovieList";

const MobileSecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const myList = useSelector((store) => store.user.myList);
  const viewedMovies = useSelector((store) => store.user.viewedMovies);
  return (
    <div className="mt-4 bg-black text-white">
      {viewedMovies.length > 0 && (
        <MobileMovieList
          title={"Continue Watching for Shubham"}
          movies={viewedMovies}
        ></MobileMovieList>
      )}
      {myList.length > 0 && (
        <MobileMovieList title={"My List"} movies={myList}></MobileMovieList>
      )}
      {movies.nowPlayingMovies && (
        <MobileMovieList
          title={"Now Playing Movies"}
          movies={movies.nowPlayingMovies}
        ></MobileMovieList>
      )}
      {movies.topRatedMovies && (
        <MobileMovieList
          title={"Top Rated Movies"}
          movies={movies.topRatedMovies}
        ></MobileMovieList>
      )}
      {movies.popularMovies && (
        <MobileMovieList
          title={"Popular Movies"}
          movies={movies.popularMovies}
        ></MobileMovieList>
      )}
      {movies.upcomingMovies && (
        <MobileMovieList
          title={"Upcoming"}
          movies={movies.upcomingMovies}
        ></MobileMovieList>
      )}
    </div>
  );
};

export default MobileSecondaryContainer;
