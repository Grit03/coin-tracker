import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Screens/Home";
import Coin from "./Screens/Coin";
import Market from "./Screens/Market";
import Chart from "./Components/Chart";
import Price from "./Components/Price";

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
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
  },
]);

export default router;
