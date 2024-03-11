// import React from "react";
// import { useSelector } from "react-redux";
// import MovieList from "../../../components/MovieList";

// const GptMovieSuggestion = () => {
//   const { movieResults, movieNames } = useSelector((store) => store.gpt);
//   if (!movieNames) return null;
//   return (
//     <div className="p-4 m-4 bg-black text-white">
//       <div>
//         {movieNames.map((movieName, index) => (
//           <MovieList
//             key={movieName}
//             title={movieName}
//             movies={movieResults[index]}
//           ></MovieList>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GptMovieSuggestion;
