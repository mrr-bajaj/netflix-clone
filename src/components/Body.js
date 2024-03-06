import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Watch from "./Watch";
import Profiles from "./Profiles";
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
