import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { addWatchVideo } from "../utils/moviesSlice";
import { updatePath } from "../utils/configSlice";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieId = searchParams.get("v");
  useMovieTrailer(movieId);
  const watchVideo = useSelector((store) => store.movies?.watchVideo);
  const modalId = useSelector((store) => store.config.path);
  if (!watchVideo)
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-6xl text-red-700 ">Video Not Available</div>
        <div
          className="text-3xl cursor-pointer hover:text-blue-500"
          onClick={() => {
            dispatch(updatePath(modalId));
            navigate("/browse?jbv=" + modalId);
          }}
        >
          Go Back
        </div>
      </div>
    );
  return (
    <div style={{ position: "relative" }}>
      <iframe
        className="w-[100vw] h-[100vh]"
        src={`https://www.youtube.com/embed/${watchVideo?.key}?&autoplay=1&mute=1&start=5`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <div
        className="fixed top-10 left-10 m-4 z-20 text-white cursor-pointer"
        onClick={() => {
          dispatch(addWatchVideo(null));
          if (modalId) {
            navigate("/browse?jbv=" + modalId);
          } else {
            navigate("/browse");
          }
        }}
      >
        <FaArrowLeft size={48} />
      </div>
    </div>
  );
};

export default Watch;
