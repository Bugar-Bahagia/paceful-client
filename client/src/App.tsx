import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./loginPage/LoginPage";
import Home from "./Pages/Home";
import RegisterPage from "./registerPage/RegisterPage";
import AllActivity from "./Pages/activity/Activity-log";
import UpdateActivity from "./Pages/activity/Update Activity";
import UserProfile from "./userProfile/UserProfile";
import AllGoals from "./Pages/goal/Goals";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        throw redirect("/");
      } else {
        return null;
      }
    },
    element: <LoginPage />,
  },
  
  {
    element:
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>,
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
          </>
        ),
      },
      {
        path: "/profile",
        element: (
          <>
            <UserProfile />
          </>
        ),
      },
    
      {
        path: "/activity-log",
        element: (
          <>
            <AllActivity />
          </>
        ),
      },
      {
        path: "/goal",
        element: (
          <>
            <AllGoals />
          </>
        ),
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
