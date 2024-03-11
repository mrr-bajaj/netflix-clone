import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePath } from "../redux/slices/configSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
        <LazyLoadImage
          className="aspect-3/4"
          src={IMG_CDN_URL + movieInfo?.poster_path}
          alt="movie-card"
          effect="blur"
        ></LazyLoadImage>
      </Link>
    </div>
  );
};

export default MobileMovieCard;
