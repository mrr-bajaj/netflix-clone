import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const movieId = trailerVideo?.key ? null : searchParams.get("v");
  useMovieTrailer(movieId);
  return (
    <div style={{ position: "relative" }}>
      <iframe
        className="w-[100vw] h-[100vh]"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=1&start=5`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Link to={"/browse"}>
        <div className="fixed top-10 left-10 m-4 z-20 text-white">
          <FaArrowLeft size={48} />
        </div>
      </Link>
    </div>
  );
};

export default Watch;
