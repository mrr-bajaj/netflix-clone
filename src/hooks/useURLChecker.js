import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePath } from "../utils/configSlice";

const useURLChecker = () => {
  const dispatch = useDispatch();

  const setPath = (key) => {
    if (key) dispatch(updatePath(key));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.href.split("?")[1]);
    const key = params.get("jbv");
    if (key) setPath(key);
  }, []);
};

export default useURLChecker;
