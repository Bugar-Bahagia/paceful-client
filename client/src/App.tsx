import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import LoginPage from './loginPage/LoginPage'
import Home from "./Pages/Home";
import CreateActivity from "./Pages/Create Activity";

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
    path: '/activity-log',
    element:
    <>
    <Navbar />
    <CreateActivity />
    </>
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
