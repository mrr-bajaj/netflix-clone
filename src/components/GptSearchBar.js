import React from "react";

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder="What would you like to watch today?"
        ></input>
        <button className="m-4 p-4 col-span-3 rounded-lg text-white bg-red-700">Search</button>
      </form>
    </div>
  );
};

export default GptSearchBar;
