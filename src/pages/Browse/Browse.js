import React from "react";
import Header from "../../components/Header";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import usePopularMovies from "../../hooks/usePopularMovies";
import GptSearchPage from "../GPTSearch/GptSearchPage";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import useURLChecker from "../../hooks/useURLChecker";
import useMyListMovies from "../../hooks/useMyListsMovies";
import useSetProfileId from "../../hooks/useSetProfileId";
import DesktopView from "../../components/DesktopView";
import MobileView from "../../components/MobileView";
import MobileModal from "../../components/MobileModal";
import Footer from "../../components/Footer";
import useViewedMovies from "../../hooks/useViewedMovies";

const Browse = () => {
  useURLChecker();
  useSetProfileId();
  useMyListMovies();
  useViewedMovies();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const device = useSelector((store) => store.config.device);
  // const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  return (
    <div className="relative">
      <Header></Header>
      {/* {showGptSearch ? (
        <GptSearchPage></GptSearchPage>
      ) : (
        <> */}
      {device === "mobile" ? (
        <>
          <MobileView></MobileView>
          <MobileModal></MobileModal>
        </>
      ) : (
        <>
          <DesktopView></DesktopView>
          <Modal></Modal>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Browse;
