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

const Browse = () => {
  useURLChecker();
  useSetProfileId();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useMyListMovies();
  // const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  return (
    <div className="relative">
      <Header></Header>
      {/* {showGptSearch ? (
        <GptSearchPage></GptSearchPage>
      ) : (
        <> */}
      <DesktopView></DesktopView>
      <MobileView></MobileView>
      {/* </>
      )} */}
      <div className="hidden md:block">
        <Modal></Modal>
      </div>
      <div className="md:hidden">
        <MobileModal></MobileModal>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Browse;
