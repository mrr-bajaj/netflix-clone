import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDevice } from "../redux/slices/configSlice";

const useDeviceCheck = () => {
  const dispatch = useDispatch();

  // Update the screen width state when the window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(addDevice("mobile"));
      } else {
        dispatch(addDevice("desktop"));
      }
    };
    handleResize();
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
};

export default useDeviceCheck;
