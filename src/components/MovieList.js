import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  let [sliderIndex, setSliderIndex] = useState(0);
  const [itemsPerScreen, setItemsPerScreen] = useState(6);
  const itemCount = movies.length;
  const [progressBarItems, setProgressBarItems] = useState([]);

  const progressBarItemCount = Math.floor(itemCount / itemsPerScreen);

  useEffect(() => {
    calculateProgressBar();
  }, [sliderIndex]);
  const calculateProgressBar = () => {
    const tempItem = [];
    for (let i = 0; i < progressBarItemCount; i++) {
      tempItem.push("item");
    }
    setProgressBarItems(tempItem);
    if (sliderIndex >= progressBarItemCount) {
      sliderIndex = progressBarItemCount - 1;
    }
  };

  const handleButtonClick = (direction) => {
    if (direction === "right") {
      if (sliderIndex + 1 >= progressBarItemCount) {
        setSliderIndex(0);
      } else {
        setSliderIndex(sliderIndex + 1);
      }
    } else if (direction === "left") {
      if (sliderIndex - 1 < 0) {
        setSliderIndex(progressBarItemCount - 1);
      } else {
        setSliderIndex(sliderIndex - 1);
      }
    }
  };
  return (
    <div className="p-6">
      <div className="header flex justify-between items-center">
        <h1 className="text-lg md:text-3xl py-6">{title}</h1>
        <div className="progress-bar flex gap-1">
          {progressBarItems.map((data, index) => (
            <div
            key={index}
              className={`progress-item min-w-6 ${
                index === sliderIndex ? "opacity-90" : " opacity-50"
              } bg-white h-2 flex-shrink-0 flex-grow-0 basis-6`}
            ></div>
          ))}
        </div>
      </div>
      <div className="container flex overflow-visible overflow-x-clip min-w-[100%]">
        {sliderIndex !== 0 && (
          <button
            className="handle  left-handle ra flex-grow-0 flex-shrink-0 z-10 basis-1 w-12 bg-black opacity-25  cursor-pointer flex justify-center items-center text-8xl hover:opacity-50 rounded-2xl rounded-tl-none rounded-bl-none"
            onClick={() => {
              handleButtonClick("left");
            }}
          >
            <div className="text transition-transform duration-150 ease-in-out hover:scale-125">
              &#8249;
            </div>
          </button>
        )}
        <div
          className={`slider flex flex-grow overflow-visible  transition-transform ease-in-out translate-x-[-${
            100 * sliderIndex
          }%]`}
        >
          {movies.map((movie, movieIndex) => (
            <MovieCard
              key={movie.id}
              movieInfo={movie}
              itemsPerScreen={itemsPerScreen}
              movieIndex={movieIndex}
            ></MovieCard>
          ))}
        </div>
        {progressBarItemCount !== 0 && (
          <button
            className="handle right-handle flex-grow-0 flex-shrink-0 z-10 basis-1 w-12 bg-black opacity-25  cursor-pointer flex justify-center items-center text-8xl hover:opacity-50 rounded-2xl rounded-tr-none rounded-br-none"
            onClick={() => {
              handleButtonClick("right");
            }}
          >
            <div className="text transition-transform duration-150 ease-in-out hover:scale-125">
              &#8250;
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;
