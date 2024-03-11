import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfileCard = ({ profileInfo }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group cursor-pointer m-2 md:mx-6 flex flex-col justify-center items-center"
      onClick={() => {
        localStorage.setItem("profileId", profileInfo?.id);
        navigate("/browse");
      }}
    >
      <div className="m-2 h-[30vw] w-[30vw] md:mt-4 md:h-[10vw] md:w-[10vw] group-hover:border-4 group-hover:border-white rounded-md">
        <img
          className="w-[100%] rounded-md"
          src={profileInfo?.photoURL}
          alt=""
        ></img>
      </div>
      <div className="mt-4 text-xl text-gray-600 group-hover:text-white">
        {profileInfo?.name}
      </div>
    </div>
  );
};

export default UserProfileCard;
