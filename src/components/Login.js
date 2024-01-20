import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header></Header>
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/16006346-87f9-4226-bc25-a1fb346a2b0c/9662d0fd-0547-4665-b887-771617268815/IN-en-20240115-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="background"
        ></img>
      </div>
      <form className="absolute bg-black w-1/3 my-36 mx-auto right-0 left-0 p-12 text-white rounded-lg bg-opacity-75">
        <h1 className="py-4 font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="my-4 p-4 bg-gray-700 w-full"
            type="text"
            placeholder="Name"
          ></input>
        )}
        <input
          className="my-4 p-4 bg-gray-700 w-full"
          type="email"
          placeholder="Email"
        ></input>
        <input
          className="my-4 p-4 bg-gray-700 w-full"
          type="password"
          placeholder="Password"
        ></input>
        <button className="my-4 p-4 w-full bg-red-700 rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
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
