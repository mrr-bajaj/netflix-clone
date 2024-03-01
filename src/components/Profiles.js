import AddProfile from "./AddProfile";
import { useDispatch, useSelector } from "react-redux";
import { showAddProfile } from "../utils/configSlice";
import Header from "./Header";
import UserProfileCard from "./UserProfileCard";

const Profiles = () => {
  const showProfile = useSelector((store) => store.config.showProfile);
  const profiles = useSelector((store) => store.user.profiles);
  const dispatch = useDispatch();
  const handleAddProfile = () => {
    dispatch(showAddProfile(true));
  };

  return (
    <>
      <Header></Header>
      <div className="bg-black w-full h-screen text-white">
        <div className="flex justify-center items-center h-[100%]">
          {!showProfile && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-6xl text-white">Who's watching?</div>
              <div className="flex m-2">
                {profiles &&
                  profiles?.length > 0 &&
                  profiles.map((profile, index) => (
                    <UserProfileCard
                      key={index}
                      profileInfo={profile}
                    ></UserProfileCard>
                  ))}
                {profiles && profiles?.length < 4 && (
                  <div
                    className=" group cursor-pointer"
                    onClick={handleAddProfile}
                  >
                    <div className="mt-4 h-[10vw] w-[10vw]  rounded-md group-hover:bg-gray-800 text-center flex justify-center items-center">
                      <button className="text-4xl group-hover:bg-black bg-white px-3 py-4 rounded-full">
                        ➕
                      </button>
                    </div>
                    <div className="mt-4 px-10 text-xl text-gray-600 group-hover:text-white">
                      Add Profile
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {showProfile && <AddProfile count={profiles.length}></AddProfile>}
        </div>
      </div>
    </>
  );
};

export default Profiles;
