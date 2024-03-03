import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[0];
  const { id } = mainMovie;
  return (
    <div className="pt-[40%] md:pt-0 bg-black">
      <VideoTitle movieInfo={mainMovie}></VideoTitle>
      <VideoBackground movieId={id}></VideoBackground>
    </div>
  );
};

export default MainContainer;
