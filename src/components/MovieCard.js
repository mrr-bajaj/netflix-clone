import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { faChevronDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { updatePath } from "../utils/configSlice";
import { addMyList } from "../utils/userSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { addModalTrailerInfo } from "../utils/moviesSlice";

export const addToMyList = (dispatch, movieInfo) => {
  postToMyList(dispatch, movieInfo);
};

const postToMyList = async (dispatch, movieInfo) => {
  const userId = localStorage.getItem("userId");
  const profileId = localStorage.getItem("profileId");
  const myListRef = collection(
    db,
    `users/${userId}/profiles/${profileId}/myList`
  );
  await addDoc(myListRef, movieInfo);
  dispatch(addMyList(movieInfo));
};

const MovieCard = ({ movieInfo }) => {
  const dispatch = useDispatch();

  if (!movieInfo) return null;
  return (
    <div className="w-36 md:w-80 group pr-4">
      <img
        className="rounded-md"
        src={IMG_CDN_URL + movieInfo?.backdrop_path}
        alt="Movie Card"
      ></img>
      <div className="hidden group-hover:block">
        <div className="flex justify-between p-1 ">
          <div>
            <Link to={"/watch?v=" + movieInfo?.id}>
              <button className="bg-white m-1 px-2 py-1 rounded-full">
                <FontAwesomeIcon color="black" icon={faPlay} />
              </button>
            </Link>
            <button
              onClick={() => addToMyList(dispatch, movieInfo)}
              className="bg-gray-200 p-1 m-1 rounded-full group  relative"
            >
              ➕{" "}
              <span className="tooltip-text hidden  group-hover:block absolute z-10 top-[-130%] left-[-180%] w-36 bg-white text-black text-center px-4 font-bold p-1 rounded-md">
                Add to My List
              </span>
            </button>
          </div>
          <div>
            <Link to={"?jbv=" + movieInfo?.id}>
              <button
                className="bg-white p-1 px-2 m-1 rounded-full group relative"
                onClick={() => {
                  dispatch(addModalTrailerInfo(movieInfo));
                  dispatch(updatePath(movieInfo?.id));
                }}
              >
                <FontAwesomeIcon color="black" icon={faChevronDown} />
                <span className="tooltip-text hidden  group-hover:block absolute z-10 top-[-130%] left-[-150%] w-36 bg-white text-black text-center px-4 font-bold p-1 rounded-md">
                  More Info
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
