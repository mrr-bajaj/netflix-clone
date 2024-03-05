import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MobileMovieCard = ({ movieInfo }) => {
  return (
    <div className="min-w-32 mx-2">
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
