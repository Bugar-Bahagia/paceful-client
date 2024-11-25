import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
