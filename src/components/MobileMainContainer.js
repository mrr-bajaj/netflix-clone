import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useListUtils from "../hooks/useListUtils";

const MobileMainContainer = () => {
  const [isPresentInList, setIsPresentInList] = useState();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const { addToMyList, removeFromMyList, postToViewedMovies } = useListUtils();
  if (!movies) return;
  const mainMovie = movies[0];
  const { id } = mainMovie;
  return (
    <div className="relative">
      <div className="bg-black -z-50 opacity-50 h-screen absolute w-screen"></div>
      <div className="pt-[25%]">
        <div className="flex justify-center ">
          <img
            className="w-[80vw] h-[60vh] rounded-lg aspect-4/3 shadow-xl"
            src={IMG_CDN_URL + mainMovie?.poster_path}
            alt="thumbnail"
          ></img>
          <div className="absolute flex flex-col justify-center w-[80vw] text-white bottom-5">
            <div className="my-4">
              <ul className="flex list-disc justify-center text-sm">
                <li className="list-none mx-3">Drama</li>
                <li className="mx-3">Thriller</li>
                <li className="mx-3">Crime</li>
                <li className="mx-3">Mystery</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Link to={"/watch?v=" + id}>
                <button
                  className="bg-white text-black py-2 px-[10vw] mx-2 font-bold text-sm  rounded-sm"
                  onClick={() => postToViewedMovies(mainMovie)}
                >
                  <FontAwesomeIcon color="black" icon={faPlay} /> Play
                </button>
              </Link>
              <button
                className="bg-gray-400 text-white font-bold py-2 mx-2 px-[8vw] text-sm  rounded-sm"
                onClick={() => {
                  isPresentInList
                    ? removeFromMyList(mainMovie, setIsPresentInList)
                    : addToMyList(mainMovie, setIsPresentInList);
                }}
              >
                {isPresentInList ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}{" "}
                My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMainContainer;
