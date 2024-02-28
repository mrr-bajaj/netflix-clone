import React from "react";

const SimilarVideoCard = ({ videoInfo }) => {
  return (
    <>
      <div className="shadow-md bg-gray-800 w-[30%] rounded-lg mt-3 m-2">
        <img
          className="w-full h-[16vh] rounded-t-lg"
          alt="thumbnail"
          src={"https://image.tmdb.org/t/p/w154/" + videoInfo?.poster_path}
        ></img>
        <div className="m-1 px-1 mt-4 flex justify-between items-center">
          <div>
            <span className="border border-white px-1 m-1">A</span>
            <span className="border border-white px-1 m-1">HD</span>
            <span className="m-1 p-1">2023</span>
          </div>
          <div className="">
            <button className="bg-gray-200 p-1  rounded-full">➕</button>
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
