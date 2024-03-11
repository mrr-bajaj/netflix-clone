import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useMovieUtils from "../../../../hooks/useMovieUtils";

const SimilarMobileVideoCard = ({ videoInfo }) => {
  const navigate = useNavigate();
  const { postToViewedMovies } = useMovieUtils();
  if (!videoInfo?.backdrop_path) return;
  return (
    <>
      <div
        className=" w-[25vw] m-2"
        onClick={() => {
          postToViewedMovies(videoInfo);
          navigate("/watch?v=" + videoInfo?.id);
        }}
      >
        <LazyLoadImage
          className="w-full h-[16vh] rounded-md"
          alt="thumbnail"
          src={"https://image.tmdb.org/t/p/w154/" + videoInfo?.poster_path}
          effect="blur"
        ></LazyLoadImage>
      </div>
    </>
  );
};

export default SimilarMobileVideoCard;
