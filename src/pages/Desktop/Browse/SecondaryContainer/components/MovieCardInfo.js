import { useState } from "react";
import { useDispatch } from "react-redux";
import useMovieUtils from "../../../../../hooks/useMovieUtils";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { addModalTrailerInfo } from "../../../../../redux/slices/moviesSlice";
import { updatePath } from "../../../../../redux/slices/configSlice";

const MovieCardInfo = ({ movieInfo, isPresentInList, setIsPresentInList }) => {
  const dispatch = useDispatch();
  const [isMyList, setIsMyList] = useState(false);
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  const { removeFromMyList, addToMyList, postToViewedMovies } = useMovieUtils();
  return (
    <div className="text-sm">
      <div className="flex justify-between p-1 ">
        <div>
          <Link to={"/watch?v=" + movieInfo?.id}>
            <button
              className="bg-white m-1 pr-2 pl-3 py-1 rounded-full"
              onClick={() => postToViewedMovies(movieInfo)}
            >
              <FontAwesomeIcon color="black" icon={faPlay} />
            </button>
          </Link>
          <button
            onMouseEnter={() => {
              setIsMyList(true);
            }}
            onMouseLeave={() => {
              setIsMyList(false);
            }}
            onClick={() => {
              isPresentInList
                ? removeFromMyList(movieInfo, setIsPresentInList)
                : addToMyList(movieInfo, setIsPresentInList);
            }}
            className="bg-black border border-white px-2 py-1 m-1 rounded-full  relative"
          >
            {isPresentInList ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
            <span
              className={`tooltip-text ${
                isMyList ? "block" : "hidden"
              }  absolute z-10 top-[-130%] left-[-180%] w-52 bg-white text-black text-center px-4 font-bold p-1 rounded-md`}
            >
              {isPresentInList ? "Remove from My List" : "Add to My List"}
            </span>
          </button>
        </div>
        <div>
          <Link to={"?jbv=" + movieInfo?.id}>
            <button
              className="bg-white p-1 px-2 m-1 rounded-full group relative"
              onMouseEnter={() => {
                setIsMoreInfo(true);
              }}
              onMouseLeave={() => {
                setIsMoreInfo(false);
              }}
              onClick={() => {
                dispatch(addModalTrailerInfo(movieInfo));
                dispatch(updatePath(movieInfo?.id));
              }}
            >
              <FontAwesomeIcon color="black" icon={faChevronDown} />
              <span
                className={`tooltip-text ${
                  isMoreInfo ? "block" : "hidden"
                } absolute z-10 top-[-130%] left-[-150%] w-36 bg-white text-black text-center px-4 font-bold p-1 rounded-md`}
              >
                More Info
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div className="p-1">
          <span className="font-bold text-green-600">95% Match</span>{" "}
          <span className="border border-white px-1 m-1">A</span>
          <span className="m-1">2h 35m</span>
          <span className="border border-white px-1 m-1">HD</span>
        </div>
        <div>
          <ul className="flex list-disc">
            <li className="list-none mr-3">Drama</li>
            <li className="mx-3">Thriller</li>
            <li className="mx-3">Crime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieCardInfo;
