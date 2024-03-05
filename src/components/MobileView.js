import React from "react";
import MobileMainContainer from "./MobileMainContainer";
import MobileSecondaryContainer from "./MobileSecondaryContainer";

const MobileView = () => {
  return (
    <div className="md:hidden">
      <MobileMainContainer></MobileMainContainer>
      <MobileSecondaryContainer></MobileSecondaryContainer>
    </div>
  );
};

export default MobileView;
