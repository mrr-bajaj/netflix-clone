// import React, { useRef } from "react";
// import lang from "../utils/languageConstants";
// import { useDispatch, useSelector } from "react-redux";
// import openai from "../utils/openai";
// import { API_OPTIONS } from "../utils/constants";
// import { addGptMovieResult } from "../utils/gptSlice";

// const GptSearchBar = () => {
//   const langKey = useSelector((store) => store.config.lang);
//   const searchText = useRef(null);
//   const dispatch = useDispatch();
//   const searchMovieTMDB = async (movie) => {
//     const data = await fetch(
//       "https://api.themoviedb.org/3/search/movie?query=" +
//         movie +
//         "&include_adult=false&language=en-US&page=1",
//       API_OPTIONS
//     );
//     const json = await data.json();
//     return json.results;
//   };
//   const handleGptSearchClick = async () => {
//     const gptQuery =
//       "Act as a Movie Recommendation system and suggest some movies for the query: " +
//       searchText.current.value +
//       "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
//     const gptResults = await openai.chat.completions.create({
//       messages: [{ role: "user", content: gptQuery }],
//       model: "gpt-3.5-turbo",
//     });
//     if (!gptResults.choices) {
//       //TODO: Write Error Handling
//     }
//     const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

//     const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

//     const tmdbResults = await Promise.all(promiseArray);

//     dispatch(
//       addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
//     );
//   };
//   return (
//     <div className="pt-[10%] flex justify-center">
//       <form
//         className="md:w-1/2 bg-black grid grid-cols-12 w-full"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={searchText}
//           className="p-4 m-4 col-span-9"
//           type="text"
//           placeholder={lang[langKey].gptSearchPlaceholder}
//         ></input>
//         <button
//           className="m-4 p-4 col-span-3 rounded-lg text-white bg-red-700"
//           onClick={handleGptSearchClick}
//         >
//           {lang[langKey].search}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GptSearchBar;
