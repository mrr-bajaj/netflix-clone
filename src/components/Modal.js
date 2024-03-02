import { useDispatch, useSelector } from "react-redux";
import { updatePath } from "../utils/configSlice";
import { removeModalVideo } from "../utils/moviesSlice";
import useModalVideo from "../hooks/useModalVideo";
import SimilarVideoCard from "./SimilarVideoCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Modal = () => {
  const dispatch = useDispatch();
  const modalVideo = useSelector((store) => store.movies.modalVideo);
  const modalMovieInfo = useSelector((store) => store.movies.modalMovieInfo);
  const similarVideos = useSelector((store) => store.movies.similarVideos);
  const key = useSelector((store) => store.config.path);
  const handleCloseButton = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    dispatch(updatePath(null));
    dispatch(removeModalVideo());
  };
  useModalVideo();
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
                    <button className="bg-white font-bold text-lg text-black px-10 py-2 rounded-md">
                      <FontAwesomeIcon color="black" icon={faPlay} /> Play
                    </button>
                  </Link>
                  <button className="bg-gray-200 p-2 m-2 rounded-full">
                    ➕
                  </button>
                </div>
                <div className="absolute z-200 bg-white mt-[-60%] rounded-full ml-[95%]">
                  <button
                    onClick={handleCloseButton}
                    className="text-gray-500 hover:text-gray-800 rounded-full p-1 "
                  >
                    ✖
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
