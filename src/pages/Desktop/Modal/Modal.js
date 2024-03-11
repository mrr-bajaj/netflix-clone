import { useDispatch, useSelector } from "react-redux";
import { updatePath } from "../../../redux/slices/configSlice";
import { removeModalVideo } from "../../../redux/slices/moviesSlice";
import useModalVideo from "../../../hooks/useModalVideo";
import SimilarVideoCard from "./components/SimilarVideoCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlay,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useMovieUtils from "../../../hooks/useMovieUtils";

const Modal = () => {
  const dispatch = useDispatch();
  const { removeFromMyList, addToMyList, postToViewedMovies } = useMovieUtils();
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
  
  useModalVideo(setIsPresentInList);
  return (
    <>
      {modalVideo?.key && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseButton}
        >
          <div
            className="bg-black text-white rounded-lg shadow-lg- w-[45%] max-h-[95vh] overflow-y-auto scrollbar-hide "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex mb-4 flex-col">
              <div className="relative">
                <iframe
                  className="w-[100%] aspect-square h-[60vh] rounded-t-lg"
                  src={
                    "https://www.youtube.com/embed/" +
                    modalVideo?.key +
                    "?&autoplay=1&mute=1&start=4&loop=1&controls=0"
                  }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <div className="absolute z-100 m-6 mt-[-20%]">
                  <Link to={"/watch?v=" + key}>
                    <button
                      className="bg-white font-bold text-lg text-black px-10 py-2 rounded-md"
                      onClick={() => postToViewedMovies(modalTrailerInfo)}
                    >
                      <FontAwesomeIcon color="black" icon={faPlay} /> Play
                    </button>
                  </Link>
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
                <div className="absolute z-200  mt-[-59vh] sm:ml-[39vw] md:ml-[41vw] ">
                  <button
                    onClick={handleCloseButton}
                    className="bg-black border border-white rounded-full px-3 p-2 "
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
              <div className="flex p-3 m-2">
                <div>
                  <div className="p-1">
                    <span className="font-bold text-green-600">95% Match</span>{" "}
                    <span className="m-1">{modalMovieInfo?.release_year}</span>
                    <span className="m-1">{modalMovieInfo?.runtime}</span>
                    <span className="border border-white px-1 m-1">HD</span>
                  </div>
                  <div>
                    <span className="border border-white px-1 m-1">A</span>
                    <span>gore, tobacco use, violence</span>
                  </div>
                  <div className="p-1 mt-2">
                    <span className="text-2xl font-bold">
                      Watch in {modalMovieInfo?.languages}
                    </span>
                    <p className="mt-4">{modalMovieInfo?.description}</p>
                  </div>
                </div>
                <div>
                  <div className="m-1">
                    <span className="font-bold">Cast:</span>{" "}
                    {modalMovieInfo?.cast}
                  </div>
                  <div className="m-1 mt-4">
                    <span className="font-bold">Genres:</span>{" "}
                    {modalMovieInfo?.genres}
                  </div>
                  <div className="m-1 mt-4">
                    <span className="font-bold">This Movie is:</span> Violent
                  </div>
                </div>
              </div>
              <div className="mt-8 p-3 m-2">
                <div className="text-3xl p-1">More Like This</div>
                {similarVideos && (
                  <div className="flex flex-wrap">
                    {similarVideos.map((video) => (
                      <SimilarVideoCard
                        key={video.id}
                        videoInfo={video}
                      ></SimilarVideoCard>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-3 m-2">
                <div className="text-2xl p-1">
                  About {modalMovieInfo?.title}
                </div>
                <div className="p-1 m-1">
                  <span className="text-gray-600">Director:</span>
                  <span className="font-bold"> {modalMovieInfo?.director}</span>
                </div>
                <div className="p-1 m-1">
                  <span className="text-gray-600">Cast:</span>
                  <span className="font-bold"> {modalMovieInfo?.cast}</span>
                </div>
                <div className="p-1 m-1">
                  <span className="text-gray-600">Writer:</span>
                  <span className="font-bold"> {modalMovieInfo?.writer}</span>
                </div>
                <div className="p-1 m-1">
                  <span className="text-gray-600">Genres:</span>
                  <span className="font-bold"> {modalMovieInfo?.genres}</span>
                </div>
                <div className="p-1 m-1">
                  <span className="text-gray-600">This Movie is:</span>
                  <span className="font-bold"> Violent</span>
                </div>
                <div className="p-1 m-1">
                  <span className="text-gray-600">Maturity rating:</span>
                  <span className="border border-white p-1 mx-2">A</span>
                  <span className="font-bold">
                    {" "}
                    gore, tobacco use, violence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
