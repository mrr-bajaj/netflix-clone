import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../utils/firebase";
import { addMyList, removeMyList } from "../utils/userSlice";

const useListUtils = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const activeProfileId = useSelector((store) => store.user.activeProfileId);

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

  return { removeFromMyList, addToMyList };
};

export default useListUtils;
