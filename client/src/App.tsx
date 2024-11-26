import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from './loginPage/LoginPage'
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <Navbar />,
    <Home />
    </>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
