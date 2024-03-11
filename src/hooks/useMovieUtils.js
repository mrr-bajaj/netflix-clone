import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import { addMyList, addViewedMovie, removeMyList } from "../redux/slices/userSlice";

const useMovieUtils = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const activeProfileId = useSelector((store) => store.user.activeProfileId);
  const viewedMovies = useSelector((store) => store.user.viewedMovies);

  const addToMyList = (movieInfo, setIsPresentInList) => {
    postToMyList(movieInfo, setIsPresentInList);
  };

  const removeFromMyList = async (movieInfo, setIsPresentInList) => {
    const myListRef = collection(
      db,
      `users/${userId}/profiles/${activeProfileId}/myList`
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

  const postToMyList = async (movieInfo, setIsPresentInList) => {
    const myListRef = collection(
      db,
      `users/${userId}/profiles/${activeProfileId}/myList`
    );
    await addDoc(myListRef, movieInfo);
    setIsPresentInList(true);
    dispatch(addMyList(movieInfo));
  };

  const postToViewedMovies = async (movieInfo) => {
    const isPresent = viewedMovies.find((movie) => movie.id === movieInfo.id);
    if (!isPresent) {
      const viewedMoviesRef = collection(
        db,
        `users/${userId}/profiles/${activeProfileId}/viewed`
      );

      await addDoc(viewedMoviesRef, movieInfo);
      dispatch(addViewedMovie(movieInfo));
    }
  };

  return { removeFromMyList, addToMyList, postToViewedMovies };
};

export default useMovieUtils;
