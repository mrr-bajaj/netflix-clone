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
  const getUser = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
      }));
    } catch (e) {
      console.error("error fetching documents", e);
    }
  };
  const handleButtonClick = () => {
    const userEmail = email.current.value;
    const userPassword = password.current.value;
    const message = checkValidData(userEmail, userPassword);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATARS[0],
          })
            .then(async () => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              const existingEmails = await getUser();
              if (!existingEmails.includes(email)) {
                postUser({ uid, email, displayName, photoURL, profiles: [] });
              }
              dispatch(
                addUser({ uid, email, displayName, photoURL, profiles: [] })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (d) => {
        const { uid, email, displayName, photoURL } = d.user;
        const existingUsers = await getUser();
        const user = existingUsers.find((user) => user.email === email);
        if (!user) {
          postUser({ uid, email, displayName, photoURL, profiles: [] });
        } else {
          localStorage.setItem("userId", user.id);
        }
        dispatch(addUser({ uid, email, displayName, photoURL, profiles: [] }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
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
