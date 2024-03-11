import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updatePath } from "../../../../redux/slices/configSlice";
import { addModalTrailerInfo } from "../../../../redux/slices/moviesSlice";
import useListUtils from "../../../../hooks/useListUtils";

const VideoTitle = ({ movieInfo }) => {
  const { title, overview, id } = movieInfo;
  const dispatch = useDispatch();
  const { postToViewedMovies } = useListUtils();
  return (
    <div className="pt-[20%] px-6 md:px-24 absolute bg-gradient-to-r from-black w-[100%] aspect-video text-white">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div>
        <Link to={"/watch?v=" + id}>
          {" "}
          <button
            className="bg-white text-black py-2 my-1 md:py-4 px-4 md:px-12 text-sm md:text-xl hover:bg-opacity-80 rounded-lg"
            onClick={() => postToViewedMovies(movieInfo)}
          >
            {" "}
            <FontAwesomeIcon color="black" icon={faPlay} /> Play
          </button>{" "}
        </Link>
        <Link to={"?jbv=" + id}>
          <button
            className="hidden md:inline-block  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg mx-2"
            onClick={() => {
              dispatch(addModalTrailerInfo(movieInfo));
              dispatch(updatePath(id));
            }}
          >
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;
