import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-6">
      <h1 className="text-lg md:text-3xl py-6">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar ">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieInfo = {movie}
            ></MovieCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
