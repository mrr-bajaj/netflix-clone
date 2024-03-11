import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addAllProfiles } from "../redux/slices/userSlice";

const useGetProfiles = () => {
  const dispatch = useDispatch();
  const email = useSelector((store) => store.user.email);
  const getProfiles = async () => {
    const userId = localStorage.getItem("userId");
    try {
      if (userId) {
        const profileRef = collection(db, `users/${userId}/profiles`);
        if (profileRef) {
          const profileSnap = await getDocs(profileRef);
          const profiles = profileSnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          dispatch(addAllProfiles(profiles));
        }
      }
    } catch (e) {
      console.error("error fetching doc", e);
    }
  };
  useEffect(() => {
    if (email) getProfiles();
  }, [email]);
};

export default useGetProfiles;
