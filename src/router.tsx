import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Screens/Home";
import Coin from "./Screens/Coin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default router;
