import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const myList = useSelector((store) => store.user.myList);
  return (
    movies && (
      <div className="bg-black text-white">
        <div className="mt-0 md:-mt-72 pl-3 md:pl-6 relative z-20">
          {movies.nowPlayingMovies && (
            <MovieList
              title={"Now Playing"}
              movies={movies.nowPlayingMovies}
            ></MovieList>
          )}
          {movies.topRatedMovies && (
            <MovieList
              title={"Top Rated"}
              movies={movies.topRatedMovies}
            ></MovieList>
          )}
          {movies.popularMovies && (
            <MovieList
              title={"Popular"}
              movies={movies.popularMovies}
            ></MovieList>
          )}
          {movies.upcomingMovies && (
            <MovieList
              title={"Upcoming"}
              movies={movies.upcomingMovies}
            ></MovieList>
          )}
          {myList.length > 0 && (
            <MovieList title={"My List"} movies={myList}></MovieList>
          )}
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
