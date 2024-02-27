import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addModalVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useModalVideo = () => {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.config.path);

  const getModalVideo = async (jbvValue) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        jbvValue +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const videoData = filteredData.length ? filteredData[0] : json.results[0];
    dispatch(addModalVideo(videoData));
  };

  useEffect(() => {
    if (key) {
      document.body.style.overflow = "hidden";
      getModalVideo(key);
    } // Disable scrolling
    else {
      document.body.style.overflow = ""; // Enable scrolling
    }
  }, [key]);
};

export default useModalVideo;
