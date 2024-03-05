import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addModalMovieInfo,
  addModalVideo,
  addSimilarVideos,
} from "../utils/moviesSlice";
import { useEffect } from "react";

const useMobileModalVideo = () => {
  const dispatch = useDispatch();
  const key = useSelector((store) => store.config.path);

  const getMovieVideosInfo = async (jbvValue) => {
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

  const getMovieSimilarInfo = async (jbvValue) => {
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

  const getMovieInfo = async (jbvValue) => {
    const movideData = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        jbvValue +
        "?language=en-US&page=1",
      API_OPTIONS
    );
    const movieJson = await movideData.json();
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        jbvValue +
        "/credits?language=en-US",
      API_OPTIONS
    );
    const credits = await data.json();
    const director = credits.crew.find(
      (member) => member.job === "Director"
    )?.name;
    const cast = credits.cast
      .slice(0, 10)
      .map((c) => c.name)
      .join(", "); // Get top 10 cast members
    const writer =
      credits.crew.find((member) => member.job === "Screenplay")?.name ??
      director;
    const { genres, overview, runtime, spoken_languages, release_date, title } =
      movieJson;
    const movieInfo = {
      genres: genres.map((genre) => genre.name).join(", "),
      release_year: release_date.split("-")[0],
      description: overview,
      languages: spoken_languages.map((lang) => lang.name).join(", "),
      runtime: `${Math.floor(runtime / 60)}h ${runtime % 60}m`,
      cast,
      writer,
      director,
      title,
    };
    dispatch(addModalMovieInfo(movieInfo));
  };

  const getModalVideo = async (jbvValue) => {
    getMovieVideosInfo(jbvValue);
    getMovieSimilarInfo(jbvValue);
    getMovieInfo(jbvValue);
  };

  useEffect(() => {
    if (key) getModalVideo(key);
  }, [key]);
};

export default useMobileModalVideo;
