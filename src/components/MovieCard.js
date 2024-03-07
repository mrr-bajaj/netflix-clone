import React, { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import MovieCardInfo from "./MovieCardInfo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MovieCard = ({ movieInfo, itemsPerScreen, movieIndex }) => {
  const myList = useSelector((store) => store.user.myList);
  const [isPresentInList, setIsPresentInList] = useState(false);
  const widthPer = 100 / itemsPerScreen;
  const [width, setWidth] = useState(`w-[${widthPer}%]`);
  useEffect(() => {
    let wid = Math.floor(100 / itemsPerScreen);
    setWidth(`w-[${wid}%]`);
  }, [itemsPerScreen]);

  if (!movieInfo) return null;
  return (
    <div
      className={`aspect-video mx-1 flex-grow-0 group hover:scale-150 ${
        movieIndex % itemsPerScreen === 0 ? "hover:translate-x-[4.2rem]" : ""
      } flex-shrink-0 flex flex-col ${width} `}
      onMouseEnter={() => {
        setIsPresentInList(myList.some((list) => list.id === movieInfo?.id));
      }}
    >
      <LazyLoadImage
        className="rounded-md"
        src={IMG_CDN_URL + movieInfo?.backdrop_path}
        alt="Movie Card"
        effect="blur"
      ></LazyLoadImage>
      <div className="hidden group-hover:block">
        <MovieCardInfo
          movieInfo={movieInfo}
          isPresentInList={isPresentInList}
          setIsPresentInList={setIsPresentInList}
        ></MovieCardInfo>
      </div>
    </div>
  );
};

export default MovieCard;
