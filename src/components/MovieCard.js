import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import {
  faCheck,
  faChevronDown,
  faPlay,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { updatePath } from "../utils/configSlice";
import { addMyList, removeMyList } from "../utils/userSlice";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { addModalTrailerInfo } from "../utils/moviesSlice";

const userId = localStorage.getItem("userId");
const profileId = localStorage.getItem("profileId");

export const addToMyList = (dispatch, movieInfo, setIsPresentInList) => {
  postToMyList(dispatch, movieInfo, setIsPresentInList);
};

export const removeFromMyList = async (
  dispatch,
  movieInfo,
  setIsPresentInList
) => {
  const myListRef = collection(
    db,
    `users/${userId}/profiles/${profileId}/myList`
  );
  const myListSnap = await getDocs(myListRef);
  myListSnap.docs.map((doc) => {
    if (doc.data().id === movieInfo?.id) {
      deleteDoc(doc.ref).then(() => {
        dispatch(removeMyList(movieInfo?.id));
        setIsPresentInList(false);
      });
    }
  });
};

const postToMyList = async (dispatch, movieInfo, setIsPresentInList) => {
  const myListRef = collection(
    db,
    `users/${userId}/profiles/${profileId}/myList`
  );
  await addDoc(myListRef, movieInfo);
  setIsPresentInList(true);
  dispatch(addMyList(movieInfo));
};

const MovieCard = ({ movieInfo }) => {
  const dispatch = useDispatch();
  const myList = useSelector((store) => store.user.myList);
  const [isPresentInList, setIsPresentInList] = useState(false);

  if (!movieInfo) return null;
  return (
    <div
      className="w-36 md:w-80 group pr-4"
      onMouseEnter={() => {
        setIsPresentInList(myList.some((list) => list.id === movieInfo?.id));
      }}
    >
      <img
        className="rounded-md"
        src={IMG_CDN_URL + movieInfo?.backdrop_path}
        alt="Movie Card"
      ></img>
      <div className="hidden group-hover:block">
        <div className="flex justify-between p-1 ">
          <div>
            <Link to={"/watch?v=" + movieInfo?.id}>
              <button className="bg-white m-1 pr-2 pl-3 py-1 rounded-full">
                <FontAwesomeIcon color="black" icon={faPlay} />
              </button>
            </Link>
            <button
              onClick={() => {
                isPresentInList
                  ? removeFromMyList(dispatch, movieInfo, setIsPresentInList)
                  : addToMyList(dispatch, movieInfo, setIsPresentInList);
              }}
              className="bg-black border border-white px-2 py-1 m-1 rounded-full group  relative"
            >
              {isPresentInList ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
              )}
              <span className="tooltip-text hidden  group-hover:block absolute z-10 top-[-130%] left-[-180%] w-52 bg-white text-black text-center px-4 font-bold p-1 rounded-md">
                {isPresentInList ? "Remove from My List" : "Add to My List"}
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
