import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATARS } from "../utils/constants";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const getUser = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
      profiles: doc.data().profiles,
    }));
  } catch (e) {
    console.error("error fetching documents", e);
  }
};

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const postUser = async (user) => {
    try {
      const docRef = await addDoc(collection(db, "users"), user);
      localStorage.setItem("userId", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleButtonClick = async () => {
    const userEmail = email.current?.value;
    const userPassword = password.current?.value;
    const userName = name.current?.value;
    const message = checkValidData(userEmail, userPassword);
    setErrorMessage(message);
    if (message) return;
    try {
      if (!isSignInForm) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          userPassword
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: userName,
          photoURL: USER_AVATARS[0],
        });
        const { uid, email, displayName, photoURL } = auth.currentUser;
        const existingEmails = await getUser();
        if (!existingEmails.find((user) => user.email === email)) {
          postUser({ uid, email, displayName, photoURL, profiles: [] });
        }
        dispatch(addUser({ uid, email, displayName, photoURL, profiles: [] }));
      } else {
        await signInWithEmailAndPassword(auth, userEmail, userPassword);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const {
        user: { uid, email, displayName, photoURL },
      } = await signInWithPopup(auth, provider);
      const existingUsers = await getUser();
      const user = existingUsers.find((user) => user.email === email);
      if (!user) {
        postUser({ uid, email, displayName, photoURL, profiles: [] });
      } else {
        localStorage.setItem("userId", user.id);
      }
      dispatch(addUser({ uid, email, displayName, photoURL, profiles: [] }));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(`${errorCode}-${errorMessage}`);
    }
  };
  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header></Header>
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BG_URL}
          alt="background"
        ></img>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute bg-black w-full md:w-1/3 my-36 mx-auto right-0 left-0 p-12 text-white rounded-lg bg-opacity-75"
      >
        <h1 className="py-4 font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="my-4 p-4 bg-gray-700 w-full"
            type="text"
            placeholder="Name"
          ></input>
        )}
        <input
          ref={email}
          className="my-4 p-4 bg-gray-700 w-full"
          type="email"
          placeholder="Email"
        ></input>
        <input
          ref={password}
          className="my-4 p-4 bg-gray-700 w-full"
          type="password"
          placeholder="Password"
        ></input>
        <p className="text-red-600 py-2 font-bold text-lg">{errorMessage}</p>
        <button
          className="my-4 p-4 w-full bg-red-700 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && (
          <button
            className="my-4 p-4 w-full bg-red-700 rounded-lg"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        )}
        <p className="py-4 cursor-pointer" onClick={toggleSignUpForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
