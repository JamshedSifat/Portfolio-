import { createBrowserRouter } from "react-router";
import Layout from "../Layouts/Layout";
import Home from "../Components/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout></Layout>,
      children:[
        {
            index:true,
            path:"/",
            element:<Home></Home>
        },
    ]
   
  },
]);