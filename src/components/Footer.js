import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faGithub,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white flex justify-center flex-col items-center h-[20vh] text-xl">
      <div className="m-2">Developer Details</div>
      <div className="">
        <div>
          <span>Shubham Bajaj | </span>
          <span>
            <FontAwesomeIcon icon={faPhoneAlt} className=" text-lg" />{" "}
            8238922587
          </span>
        </div>
        <div className="flex justify-center m-2">
          <span>
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={() => {
                window.open("mailto:shubhambajaj90495@gmail.com");
              }}
              icon={faGoogle}
            />{" "}
            |
          </span>
          <span className="mx-2">
            <Link
              to={"https://www.linkedin.com/in/shubham-bajaj-3530431b3/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>{" "}
            |
          </span>
          <span>
            <Link
              to={"https://github.com/mrr-bajaj/netflix-clone"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
