import { useDispatch, useSelector } from "react-redux";
import { updatePath } from "../utils/configSlice";
import { removeModalVideo } from "../utils/moviesSlice";
import useModalVideo from "../hooks/useModalVideo";

const Modal = () => {
  const dispatch = useDispatch();
  const modalVideo = useSelector((store) => store.movies.modalVideo);

  const handleCloseButton = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    dispatch(updatePath(null));
    dispatch(removeModalVideo());
  };
  useModalVideo();
console.log(modalVideo)
  return (
    <>
      {modalVideo?.key && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseButton}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <iframe
                src={
                  "https://www.youtube.com/embed/" +
                  modalVideo?.key +
                  "?&autoplay=1&mute=1&start=4"
                }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              <button
                onClick={handleCloseButton}
                className="text-gray-500 hover:text-gray-800"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p>This is the content of the modal dialog.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
