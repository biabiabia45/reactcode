import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Register from "../pages/Register";
import User from "../pages/User";
import Wallet from "../pages/Wallet";
import ChangePassword from "../pages/ChangePassword";
import Transaction from "../pages/Transaction";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/ChangePassword",
    element: <ChangePassword />,
  },
  {
    path: "/Menu",
    element: <Menu />,
    children: [
      {
        path: "User",
        element: <User />,
      },
      {
        path: "Wallet",
        element: <Wallet />,
      },
      {
        path: "Transaction",
        element: <Transaction />,
      },
    ],
  },
]);

export default router;
