import AddProfile from "./components/AddProfile";
import { useDispatch, useSelector } from "react-redux";
import { showAddProfile } from "../../redux/slices/configSlice";
import Header from "../../components/Header";
import UserProfileCard from "./components/UserProfileCard";
import useRemoveContext from "../../hooks/useRemoveContext";

const Profiles = () => {
  const dispatch = useDispatch();
  const showProfile = useSelector((store) => store.config.showProfile);
  const profiles = useSelector((store) => store.user.profiles);

  const handleAddProfile = () => {
    dispatch(showAddProfile(true));
  };

  useRemoveContext();

  return (
    <>
      <Header></Header>
      <div className="bg-black w-full h-screen text-white">
        {!showProfile && (
          <div className={`flex justify-center  items-center h-[100%]`}>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl md:text-6xl text-white">
                Who's watching?
              </div>
              <div className="flex m-2 flex-wrap">
                <div className="flex flex-row flex-wrap justify-center">
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
                      className=" group m-2 cursor-pointer flex flex-col justify-between items-center"
                      onClick={handleAddProfile}
                    >
                      <div className="h-[30vw] w-[30vw] md:mt-4 md:h-[10vw] md:w-[10vw]  rounded-md group-hover:bg-gray-800 text-center flex justify-center items-center">
                        <button className="text-4xl group-hover:bg-black bg-white px-3 py-4 rounded-full">
                          ➕
                        </button>
                      </div>
                      <div className="mt-4  text-xl text-gray-600 group-hover:text-white">
                        Add Profile
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {showProfile && (
          <div className={`flex sm:justify-center items-center h-[100%]`}>
            <AddProfile count={profiles.length}></AddProfile>
          </div>
        )}
      </div>
    </>
  );
};

export default Profiles;
