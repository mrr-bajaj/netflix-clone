import Browse from "../../pages/Desktop/Browse/Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Watch from "../../pages/Common/Watch/Watch";
import Profiles from "../../pages/Common/Profiles/Profiles";
import Login from "../../pages/Common/Login/Login"
import useDeviceCheck from "../../hooks/useDeviceCheck";

const Body = () => {
  useDeviceCheck();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/profiles",
      element: <Profiles></Profiles>,
    },
    {
      path: "browse",
      element: <Browse></Browse>,
    },
    {
      path: "watch",
      element: <Watch></Watch>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;
