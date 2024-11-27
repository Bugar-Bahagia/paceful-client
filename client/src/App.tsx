import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from './loginPage/LoginPage'
import Home from "./Pages/Home"
import RegisterPage from './registerPage/RegisterPage'
import UserProfile from './userProfile/UserProfile'

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token")
      if (isLoggedIn) {
        throw redirect("/")
      } else {
        return null
      }
    },
    element: <LoginPage />,
  },
  {
    path: "/",
    element:
      <>
        <Navbar />,
        <Home />
      </>
  },
  {
    path: "/profile",
    element:
      <>
        <Navbar />,
        <UserProfile />
      </>
  },

])

function App() {
  return <RouterProvider router={router} />
}

export default App
