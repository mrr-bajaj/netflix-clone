import Browse from "../pages/Browse/Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Watch from "./Watch";
import Profiles from "../pages/Profiles/Profiles";
import useDeviceCheck from "../hooks/useDeviceCheck";

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
