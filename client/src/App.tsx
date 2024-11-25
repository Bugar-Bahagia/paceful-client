import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from './loginPage/LoginPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
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
