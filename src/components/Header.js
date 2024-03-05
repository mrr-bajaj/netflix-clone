import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProfileId, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATARS } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { checkAndPostUser } from "./Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const email = useSelector((store) => store.user.email);
  const [showDropdown, setShowDropown] = useState(false);
  // const userId = localStorage.getItem("userId");
  // const profileId = localStorage.getItem("profileId");
  // const userId = useSelector((store) => store.user.userId);
  // const profileId = useSelector((store) => store.user.profileId);
  const [userProfiles, setUserProfiles] = useState([]);
  // const getUserProfiles = async () => {
  //   if (userId) {
  //     const profileRef = collection(db, `users/${userId}/profiles`);
  //     console.log(profileId)
  //     const profileSnap = await getDocs(profileRef);
  //     const profiles = profileSnap.docs
  //       .filter((profile) => profile.id !== profileId)
  //       .map((profile) => {
  //         return { id: profile.id, ...profile.data() };
  //       });
  //     console.log(profiles);
  //     setUserProfiles(profiles);
  //   }
  // };
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
  // useEffect(() => {
  //   getUserProfiles();
  // }, [userId, profileId]);
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
          <div className="flex flex-col">
            <button
              className="px-5 text-center inline-flex items-center"
              onMouseEnter={() => {
                setShowDropown(true);
              }}
              onMouseLeave={() => {
                setShowDropown(false);
              }}
            >
              <img
                className="w-12 h-12 m-2"
                alt="userIcon"
                src={USER_AVATARS[0]}
              ></img>
              <span>
                <FontAwesomeIcon color="white" icon={faChevronDown} />
              </span>
            </button>

            <div
              className={`z-10 absolute top-20 right-12 ${
                showDropdown ? "" : "hidden"
              }
               bg-black divide-y divide-gray-700 text-white rounded-lg shadow w-40`}
              onMouseEnter={() => {
                setShowDropown(true);
              }}
              onMouseLeave={() => {
                setShowDropown(false);
              }}
            >
              <ul className="p-2 text-sm ">
                {userProfiles.map((profile) => (
                  <li
                    key={profile.id}
                    className="hover:underline flex items-center my-3 hover:cursor-pointer"
                    onClick={() => {
                      // localStorage.setItem("profileId", profile.id);
                      // dispatch(addProfileId(profile.id));
                      // navigate("/browse");
                    }}
                  >
                    <img
                      className="w-6 h-6 mx-1"
                      alt="userIcon"
                      src={profile?.photoURL}
                    ></img>
                    {profile?.name}
                  </li>
                ))}
                <li
                  className="hover:underline m-2 hover:cursor-pointer"
                  onClick={() => {
                    // localStorage.removeItem("profileId");
                    // navigate("/profiles");
                  }}
                >
                  <FontAwesomeIcon icon={faUserCog} className="mx-1" />
                  <span>Manage Profile</span>
                </li>
              </ul>
              <div
                className="p-2 mx-1 text-sm hover:underline hover:cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
