import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Screens/Home";
import Coin from "./Screens/Coin";
import Market from "./Screens/Market";

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
        path: "market",
        element: <Market />,
      },
      {
        path: ":coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default router;
