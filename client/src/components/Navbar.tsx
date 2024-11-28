import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    // Clear the authentication token from local storage (or session storage)
    localStorage.removeItem("token"); // Or use sessionStorage, depending on your setup
    localStorage.removeItem("userProfile");

    // Redirect to the login page after logout
    Swal.fire(
      "Logged Out!",
      "You have been logged out successfully.",
      "success"
    ).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="navbar bg-base-100 border border-black-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/activity-log"}>Activity Log</Link>
            </li>
            <li>
              <Link to={"/goal"}>Goals</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/activity-log"}>Activity Log</Link>
          </li>
          <li>
            <Link to={"/goal"}>Goals</Link>
          </li>
        </ul>
      </div>

      {/* Bagian kanan navbar */}
      <div className="navbar-end ">
        <div className="avatar placeholder dropdown dropdown-end pr-4">
          <div
            tabIndex={0}
            role="button"
            className="bg-accent  bg-neutral text-neutral-content w-12 rounded-full flex items-center justify-center cursor-pointer  border border-blue-500"
          >
            <span>SY</span>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-35 p-2 shadow "
          >
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevent page refresh on form submit
                    handleLogout();
                  }}
                >
                  <button type="submit">Logout</button>
                </form>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/* <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevent page refresh on form submit
                  handleLogout();
                }}
              >
                <button type="submit">Logout</button>
              </form>
            </li>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul> */}
      </div>
    </div>
  );
}
