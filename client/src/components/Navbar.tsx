import { Link } from "react-router-dom";


export default function Navbar() {
//   const isLoggedin = cookies().has("Authorization");

  return (
    <div className="navbar bg-base-100 border border-black-100">
      {/* Bagian kiri navbar */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
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
        <div className="hidden lg:flex">
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
      </div>

      {/* Bagian tengah navbar */}
      <div className="navbar-center">
        <h1 className="btn btn-ghost text-xl">PACEFUL</h1>
      </div>

      {/* Bagian kanan navbar */}
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
            <li>
            <Link to={"/profile"}>Profile</Link>
            </li>
          {/* {isLoggedin ? ( */}
            <li>
              <form
                // action={async () => {
                //   "use server";

                //   cookies().delete("Authorization");
                //   redirect("/login");
                // }}
              >
                <button>Logout</button>
              </form>
            </li>
           {/* ) : (  */}
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
           {/* )}  */}
        </ul>
      </div>
    </div>
  );
}
