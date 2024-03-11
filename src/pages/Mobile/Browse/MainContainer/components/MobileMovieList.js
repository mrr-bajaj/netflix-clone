import React from "react";
import MobileMovieCard from "./MobileMovieCard";

const MobileMovieList = ({ title, movies }) => {
  return (
    <div>
      <h1 className="text-xl font-bold p-3">{title}</h1>
      <div className="flex overflow-y-scroll scrollbar-hide p-2">
        {movies.map((movie) => (
          <MobileMovieCard key={movie.id} movieInfo={movie}></MobileMovieCard>
        ))}
      </div>
    </div>
  );
};

export default MobileMovieList;
