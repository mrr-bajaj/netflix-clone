import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { addAllMyList } from "../utils/userSlice";

const useMyListMovies = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const activeProfileId = useSelector((store) => store.user.activeProfileId);
  const getMyListMovies = async () => {
    const querySnap = await getDocs(
      collection(db, `users/${userId}/profiles/${activeProfileId}/myList`)
    );

    const myListMovies = querySnap.docs.map((doc) => doc.data());
    dispatch(addAllMyList(myListMovies));
  };
  useEffect(() => {
    if (activeProfileId) getMyListMovies();
  }, [activeProfileId]);
};

export default useMyListMovies;
