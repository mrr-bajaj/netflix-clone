import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMovies } from "../redux/slices/moviesSlice";
import { clearMyList } from "../redux/slices/userSlice";

const useRemoveContext = () => {
  const dispatch = useDispatch();
  const activeProfileId = useSelector((store) => store.user.activeProfileId);
  const clearStore = () => {
    dispatch(clearMovies());
    dispatch(clearMyList());
  };
  useEffect(() => {
    clearStore();
  }, [activeProfileId]);
};

export default useRemoveContext;
