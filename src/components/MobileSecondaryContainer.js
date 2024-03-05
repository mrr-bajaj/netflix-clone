import React from "react";
import { useSelector } from "react-redux";
import MobileMovieList from "./MobileMovieList";

const MobileSecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const myList = useSelector((store) => store.user.myList);
  return (
    <div className="mt-4 bg-black text-white">
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
      {myList.length > 0 && (
        <MobileMovieList title={"My List"} movies={myList}></MobileMovieList>
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
