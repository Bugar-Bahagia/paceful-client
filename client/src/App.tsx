import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from './loginPage/LoginPage'
import Home from "./Pages/Home"
import RegisterPage from './registerPage/RegisterPage'

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
  {
    path: "/register",
    element: <RegisterPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
