import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from './loginPage/LoginPage'
import Home from "./Pages/Home"
import RegisterPage from './registerPage/RegisterPage'
// import CreateActivity from "./Pages/Create Activity";
import AllActivity from "./Pages/Activity-log";
import UpdateActivity from "./Pages/Update Activity"

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
    path: '/activity-log',
    element:
    <>
    <Navbar />
    <AllActivity />
    </>
  },
  {
    path: '/update-activity/:id',
    element:
    <>
    <Navbar/>
    <UpdateActivity/>
    </>
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
