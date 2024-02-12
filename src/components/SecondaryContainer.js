import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black text-white">
        <div className="mt-0 md:-mt-72 pl-3 md:pl-6 relative z-20">
          <MovieList
            title={"Now Playing"}
            movies={movies.nowPlayingMovies}
          ></MovieList>
          <MovieList
            title={"Trending"}
            movies={movies.nowPlayingMovies}
          ></MovieList>
          {movies.popularMovies && (
            <MovieList
              title={"Popular"}
              movies={movies.popularMovies}
            ></MovieList>
          )}
          <MovieList
            title={"Upcoming movies"}
            movies={movies.nowPlayingMovies}
          ></MovieList>
          <MovieList
            title={"Horro"}
            movies={movies.nowPlayingMovies}
          ></MovieList>
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
