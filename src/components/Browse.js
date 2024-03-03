import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useURLChecker from "../hooks/useURLChecker";
import useMyListMovies from "../hooks/useMyListsMovies";

const Browse = () => {
  useURLChecker();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useMyListMovies();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  return (
    <div className="relative">
      <Header></Header>
      {showGptSearch ? (
        <GptSearchPage></GptSearchPage>
      ) : (
        <>
          <MainContainer></MainContainer>
          <SecondaryContainer></SecondaryContainer>
        </>
      )}
      <Modal></Modal>
    </div>
  );
};

export default Browse;
