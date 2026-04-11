import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./components/Root/Root.jsx"
import { Home, loader as postLoader} from "./components/Home/Home.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    //errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: postLoader,
      }/*,
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      }*/
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

