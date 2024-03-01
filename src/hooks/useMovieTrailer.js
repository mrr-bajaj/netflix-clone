import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo, addWatchVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isWatchPage = searchParams.get("v");
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    if (isWatchPage || (!isWatchPage && !trailerVideo)) {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      const filteredData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filteredData.length ? filteredData[0] : json.results[0];
      if (!isWatchPage) dispatch(addTrailerVideo(trailer));
      else {
        dispatch(addWatchVideo(trailer));
      }
    }
  };
  useEffect(() => {
    movieId && getMovieVideos();
  }, []);
};

export default useMovieTrailer;
