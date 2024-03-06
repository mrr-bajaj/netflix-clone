import React, { useRef, useState } from "react";
import { USER_AVATARS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { showAddProfile } from "../utils/configSlice";
import { addProfile } from "../utils/userSlice";
import { checkProfileName } from "../utils/validate";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

const AddProfile = ({ count }) => {
  const dispatch = useDispatch();
  const name = useRef(null);
  const img = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const profiles = useSelector((store) => store.user.profiles);
  const postProfile = async (userProfile) => {
    try {
      const userId = localStorage.getItem("userId");
      const profilesCollectionRef = collection(db, `users/${userId}/profiles`);
      const userProfileSnap = await addDoc(profilesCollectionRef, userProfile);
      dispatch(addProfile({ id: userProfileSnap.id, ...userProfile }));
    } catch (e) {
      console.error("error updating profile", e);
    }
  };

  const handleContinue = () => {
    const message = checkProfileName(name.current.value.trim());
    setErrorMessage(message);
    if (message) return;
    const userProfile = {
      name: name.current.value,
      photoURL: img.current.src,
    };
    postProfile(userProfile);
    dispatch(showAddProfile(false));
  };
  return (
    <div className="md:w-[30vw] p-4 md:p-0">
      <div className="lg:text-5xl text-4xl">Add Profile</div>
      <div className="my-6">
        Add a profile for another person watching Netflix.
      </div>
      <hr></hr>
      <div className="flex my-6">
        <img
          ref={img}
          className="h-28 rounded-sm"
          src={USER_AVATARS[count]}
          alt="user-avatar"
        ></img>
        <div className="flex flex-col ">
          <input
            ref={name}
            className={`h-4 p-4 px-2 w-[45vw] md:w-[15vw] mx-4 mt-8 text-black ${
              errorMessage ? "border-2 border-red-600" : ""
            }`}
            placeholder="Name"
            type="text"
            onChange={(e) => {
              const message = checkProfileName(
                e.target.value,
                profiles.map((p) => p.name)
              );
              setErrorMessage(message);
              if (message) return;
            }}
          ></input>

          <div className="text-red-600 mx-4 py-1">{errorMessage}</div>
        </div>
      </div>
      <hr></hr>
      <div className="my-6">
        <button
          className={`bg-white text-black p-2 px-6 font-bold mr-4  ${
            errorMessage
              ? "hover:text-black hover:bg-white"
              : "hover:bg-red-600 hover:text-white"
          }`}
          onClick={handleContinue}
          disabled={errorMessage ? true : false}
        >
          Continue
        </button>
        <button
          className="border border-gray-400 text-gray-400 hover:border-white hover:text-white p-2 px-6"
          onClick={() => dispatch(showAddProfile(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProfile;
