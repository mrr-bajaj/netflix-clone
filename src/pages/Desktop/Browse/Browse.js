import React from "react";
import Header from "../../../components/Header/Header";
import useNowPlayingMovies from "../../../hooks/useNowPlayingMovies";
import usePopularMovies from "../../../hooks/usePopularMovies";
import GptSearchPage from "../../Common/GPTSearch/GptSearchPage";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import useTopRatedMovies from "../../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../../hooks/useUpcomingMovies";
import useURLChecker from "../../../hooks/useURLChecker";
import useMyListMovies from "../../../hooks/useMyListsMovies";
import useSetProfileId from "../../../hooks/useSetProfileId";
import DesktopView from "../DesktopView";
import MobileView from "../../Mobile/MobileView";
import MobileModal from "../../Mobile/Modal/MobileModal";
import useViewedMovies from "../../../hooks/useViewedMovies";
import Footer from "../../../components/Footer/Footer";

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
