import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { addWatchVideo } from "../utils/moviesSlice";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const movieId = searchParams.get("v");
  useMovieTrailer(movieId);
  const watchVideo = useSelector((store) => store.movies?.watchVideo);
  return (
    <div style={{ position: "relative" }}>
      <iframe
        className="w-[100vw] h-[100vh]"
        src={`https://www.youtube.com/embed/${watchVideo?.key}?&autoplay=1&mute=1&start=5`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <Link to={"/browse"}>
        <div
          className="fixed top-10 left-10 m-4 z-20 text-white"
          onClick={() => {
            dispatch(addWatchVideo(null));
          }}
        >
          <FaArrowLeft size={48} />
        </div>
      </Link>
    </div>
  );
};

export default Watch;
