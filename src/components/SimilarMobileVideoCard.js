import { useNavigate } from "react-router-dom";

const SimilarMobileVideoCard = ({ videoInfo }) => {
  const navigate = useNavigate();
  if (!videoInfo?.backdrop_path) return;
  return (
    <>
      <div
        className=" w-[25vw] m-2"
        onClick={() => {
          navigate("/watch?v=" + videoInfo?.id);
        }}
      >
        <img
          className="w-full h-[16vh] rounded-md"
          alt="thumbnail"
          src={"https://image.tmdb.org/t/p/w154/" + videoInfo?.poster_path}
        ></img>
      </div>
    </>
  );
};

export default SimilarMobileVideoCard;
