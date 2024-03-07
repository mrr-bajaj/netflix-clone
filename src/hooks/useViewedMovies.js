import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { addAllViewedMovies } from "../utils/userSlice";

const useViewedMovies = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const activeProfileId = useSelector((store) => store.user.activeProfileId);
  const getViewedMovies = async () => {
    const querySnap = await getDocs(
      collection(db, `users/${userId}/profiles/${activeProfileId}/viewed`)
    );

    const viewedMovies = querySnap.docs.map((doc) => doc.data());
    dispatch(addAllViewedMovies(viewedMovies));
  };
  useEffect(() => {
    if (activeProfileId) getViewedMovies();
  }, [activeProfileId]);
};

export default useViewedMovies;
