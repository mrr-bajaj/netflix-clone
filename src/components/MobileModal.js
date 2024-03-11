import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePath } from "../redux/slices/configSlice";
import { removeModalVideo } from "../redux/slices/moviesSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import useMobileModalVideo from "../hooks/useMobileModalVideo";
import { FaArrowLeft } from "react-icons/fa";
import SimilarMobileVideoCard from "./SimilarMobileVideoCard";
import useListUtils from "../hooks/useListUtils";

const MobileModal = () => {
  const dispatch = useDispatch();
  const { addToMyList, removeFromMyList, postToViewedMovies } = useListUtils();
  const modalVideo = useSelector((store) => store.movies.modalVideo);
  const modalMovieInfo = useSelector((store) => store.movies.modalMovieInfo);
  const similarVideos = useSelector((store) => store.movies.similarVideos);
  const modalTrailerInfo = useSelector(
    (store) => store.movies.modalTrailerInfo
  );
  const key = useSelector((store) => store.config.path);
  const [isPresentInList, setIsPresentInList] = useState(false);
  const handleCloseButton = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    dispatch(updatePath(null));
    dispatch(removeModalVideo());
  };
  useMobileModalVideo();
  return (
    <>
      {key && (
        <div className="fixed inset-0 bg-black text-white z-50 overflow-y-auto scrollbar-hide">
          <div className="flex mb-4 flex-col">
            <div className="relative">
              <iframe
                className="w-[100%] aspect-square h-[40vh] rounded-t-lg"
                src={
                  "https://www.youtube.com/embed/" +
                  modalVideo?.key +
                  "?&autoplay=1&mute=1&start=4&loop=1&controls=0"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              <div className="absolute z-200 mt-[-38vh] ml-[2vw]">
                <button
                  onClick={handleCloseButton}
                  className="rounded-full p-2 "
                >
                  <FaArrowLeft size={24} />
                </button>
              </div>
              <div className="p-3">
                <div className="font-bold text-3xl">
                  {modalMovieInfo?.title}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="mx-1 m-2">
                      {modalMovieInfo?.release_year}
                    </span>
                    <span className="font-bold border border-white px-2 m-2">
                      A
                    </span>
                    <span className="m-2">{modalMovieInfo?.runtime}</span>
                    <span className="border border-white px-1 m-2">HD</span>
                  </div>
                  <button
                    className="bg-black border border-white px-3 p-2 m-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      isPresentInList
                        ? removeFromMyList(modalTrailerInfo, setIsPresentInList)
                        : addToMyList(modalTrailerInfo, setIsPresentInList);
                    }}
                  >
                    {isPresentInList ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </button>
                </div>
                <Link to={"/watch?v=" + key}>
                  <button
                    className="bg-white w-full my-2 font-bold text-lg text-black px-10 py-2 rounded-md"
                    onClick={() => postToViewedMovies(modalTrailerInfo)}
                  >
                    <FontAwesomeIcon color="black" icon={faPlay} /> Play
                  </button>
                </Link>
                <div className="text-sm">{modalMovieInfo?.description}</div>
                <div className="text-sm my-2 ">
                  <span className="font-bold text-gray-600">Starring:</span>{" "}
                  {modalMovieInfo?.cast.split(",").slice(5).join(", ")}
                </div>
                <div>
                  <span className="font-bold text-gray-600">Director: </span>
                  {modalMovieInfo?.director}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="m-2">
              <div className="text-xl p-1">More Like This</div>
              {similarVideos && (
                <div className="flex justify-between">
                  <div className="flex justify-start flex-wrap mx-2">
                    {similarVideos.map((video) => (
                      <SimilarMobileVideoCard
                        key={video.id}
                        videoInfo={video}
                      ></SimilarMobileVideoCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileModal;
