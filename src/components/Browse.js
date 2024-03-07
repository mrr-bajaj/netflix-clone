import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useURLChecker from "../hooks/useURLChecker";
import useMyListMovies from "../hooks/useMyListsMovies";
import useSetProfileId from "../hooks/useSetProfileId";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";
import MobileModal from "./MobileModal";
import Footer from "./Footer";
import useViewedMovies from "../hooks/useViewedMovies";

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
