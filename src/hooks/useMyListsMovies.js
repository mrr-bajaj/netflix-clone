import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { addMyList } from "../utils/userSlice";

const useMyListMovies = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const profileId = localStorage.getItem("profileId");
  const getMyListMovies = async () => {
    const querySnap = await getDocs(
      collection(db, `users/${userId}/profiles/${profileId}/myList`)
    );

    const myListMovies = querySnap.docs.map((doc) => doc.data());
    myListMovies.map((movie) => dispatch(addMyList(movie)));
  };
  useEffect(() => {
    getMyListMovies();
  }, []);
};

export default useMyListMovies;
