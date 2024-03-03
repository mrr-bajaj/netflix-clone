import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATARS } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { checkAndPostUser } from "./Login";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const email = useSelector((store) => store.user.email);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  // const handleLanguageChange = (e) => {
  //   dispatch(changeLanguage(e.target.value));
  // };
  // const handleGptSearchClick = () => {
  //   dispatch(toggleGptSearchView());
  // };
  // const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email } = user;
        checkAndPostUser(email, dispatch, false);

        if (location.pathname === "/") navigate("/profiles");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-8 w-[100%] py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo"></img>
      {email && (
        <div className="flex justify-between p-2">
          {/* {showGptSearch && (
            <select
              className="m-2 p-2 bg-gray-600 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )} */}
          {/* <button
            className="text-white bg-purple-700 m-2 py-2 px-4"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button> */}
          <div className="flex">
            <img
              className="w-12 h-12 m-2"
              alt="userIcon"
              src={USER_AVATARS[0]}
            ></img>
            <button onClick={handleSignOut} className="font-bold text-white">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
