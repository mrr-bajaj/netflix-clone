import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePath } from "../utils/configSlice";

const MobileMovieCard = ({ movieInfo }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="min-w-32 max-w-32 mx-2"
      onClick={() => {
        dispatch(updatePath(movieInfo.id));
      }}
    >
      <Link to={"?jbv=" + movieInfo.id}>
        <img
          className="aspect-3/4"
          src={IMG_CDN_URL + movieInfo?.poster_path}
          alt="movie-card"
        ></img>
      </Link>
    </div>
  );
};

export default MobileMovieCard;
