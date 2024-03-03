import React from "react";
import { useNavigate } from "react-router-dom";
import { addToMyList } from "./MovieCard";
import { useDispatch } from "react-redux";

const SimilarVideoCard = ({ videoInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!videoInfo?.backdrop_path) return;
  return (
    <>
      <div
        className="shadow-md bg-gray-800 w-[30%] rounded-lg mt-3 m-2 cursor-pointer"
        onClick={(e) => {
          navigate("/watch?v=" + videoInfo?.id);
        }}
      >
        <img
          className="w-full h-[16vh] rounded-t-lg"
          alt="thumbnail"
          src={"https://image.tmdb.org/t/p/w154/" + videoInfo?.backdrop_path}
        ></img>
        <div className="m-1 px-1 mt-4 flex justify-between items-center">
          <div>
            <span className="border border-white px-1 m-1">A</span>
            <span className="border border-white px-1 m-1">HD</span>
            <span className="m-1 p-1">
              {videoInfo?.release_date.split("-")[0]}
            </span>
          </div>
          <div>
            <button
              className="bg-gray-200 p-1 group relative rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                addToMyList(dispatch, videoInfo);
              }}
            >
              ➕
              <span className="tooltip-text hidden  group-hover:block absolute z-10 top-[-130%] left-[-180%] w-36 bg-white text-black text-center px-4 font-bold p-1 rounded-md">
                Add to My List
              </span>
            </button>
          </div>
        </div>
        <div className="text-sm m-1 p-2 mb-8">
          <p className="line-clamp-5">{videoInfo?.overview}</p>
        </div>
      </div>
    </>
  );
};

export default SimilarVideoCard;
