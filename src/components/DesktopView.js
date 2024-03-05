import React from "react";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const DesktopView = () => {
  return (
    <div className="hidden md:block">
      <MainContainer></MainContainer>
      <SecondaryContainer></SecondaryContainer>
    </div>
  );
};

export default DesktopView;
