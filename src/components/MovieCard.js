import React, { useEffect, useState } from "react";
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

const MovieCardInfo = ({ movieInfo, isPresentInList, setIsPresentInList }) => {
  const dispatch = useDispatch();
  const [isMyList, setIsMyList] = useState(false);
  const [isMoreInfo, setIsMoreInfo] = useState(false);
  return (
    <div className="text-sm">
      <div className="flex justify-between p-1 ">
        <div>
          <Link to={"/watch?v=" + movieInfo?.id}>
            <button className="bg-white m-1 pr-2 pl-3 py-1 rounded-full">
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
                ? removeFromMyList(dispatch, movieInfo, setIsPresentInList)
                : addToMyList(dispatch, movieInfo, setIsPresentInList);
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

const MovieCard = ({ movieInfo, itemsPerScreen, movieIndex }) => {
  const myList = useSelector((store) => store.user.myList);
  const [isPresentInList, setIsPresentInList] = useState(false);
  const [widthPer, setWidthPer] = useState(100 / itemsPerScreen);
  useEffect(() => {
    let wid = Math.floor(100 / itemsPerScreen);
    setWidthPer(wid);
  }, [itemsPerScreen]);

  if (!movieInfo) return null;
  return (
    <div
      className={`aspect-video mx-1 flex-grow-0 group hover:scale-150 ${
        movieIndex % itemsPerScreen === 0 ? "hover:translate-x-[4.2rem]" : ""
      } flex-shrink-0 flex flex-col w-\[${widthPer}\%\] `}
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
