import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addActiveProfileId } from "../redux/slices/userSlice";

const useSetProfileId = () => {
  const [activeProfileId, setActiveProfileId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveProfileId(localStorage.getItem("profileId"));
    if (activeProfileId) dispatch(addActiveProfileId(activeProfileId));
  }, [activeProfileId]);
};

export default useSetProfileId;
