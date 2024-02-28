import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addModalVideo, addSimilarVideos } from "../utils/moviesSlice";
import { useEffect } from "react";

const useModalVideo = () => {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.config.path);

  const getMovieInfo = async (jbvValue) => {
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

  // const getMovieCastInfo = async (jbvValue) => {
  //   const data = await fetch(
  //     "https://api.themoviedb.org/3/movie/" + jbvValue + "/credits?language=en-US",
  //     API_OPTIONS
  //   );
  //   const credits = await data.json();
  //   const director = credits.crew.find(member => member.job === 'Director');
  //   const cast = credits.cast.slice(0, 5); // Get top 5 cast members
  //   const writer = credits.crew.find(member => member.job === 'Screenplay');
  //   console.log(director)
  //   console.log(cast)
  //   console.log(writer)
  // };

  const getSimilarVideo = async (jbvValue) => {
    const similarData = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        jbvValue +
        "/similar?language=en-US&page=1",
      API_OPTIONS
    );
    const similarJson = await similarData.json();
    const filteredSimilarData = similarJson.results.filter(
      (video) => video.original_language === "en"
    );
    dispatch(addSimilarVideos(filteredSimilarData));
  };

  const getModalVideo = async (jbvValue) => {
    getMovieInfo(jbvValue);
    getSimilarVideo(jbvValue);
    // getMovieCastInfo(jbvValue);
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
