import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/login";
import App from "./App";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'about',
          element:<About/>
        },
      ]
    },
  ]);