import React, { useEffect } from "react";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";


const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "browse",
      element: <Browse></Browse>,
    },
  ]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid,email,displayName, photoURL}));
      }else{
        dispatch(removeUser());
      }
    })
  },[]);
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;
