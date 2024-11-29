import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  email: string;
  name: string;
  dateOfBirth: string;
}

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "You need to login first", "error");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { email, name, dateOfBirth } = response.data.data;
        const formattedDate = dateOfBirth
          ? new Date(dateOfBirth).toISOString().split("T")[0]
          : "";

        setProfile({ email, name, dateOfBirth: formattedDate });
      } catch (error) {
        console.error("Error fetching profile:", error);
        Swal.fire("Error", "Failed to fetch profile", "error");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");

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
              <NavLink
                to={"/"}
                style={({ isActive }) => ({
                  color: isActive ? "green" : "black",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/activity-log"}
                style={({ isActive }) => ({
                  color: isActive ? "green" : "black",
                })}
              >
                Activity Log
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/goal"}
                style={({ isActive }) => ({
                  color: isActive ? "green" : "black",
                })}
              >
                Goals
              </NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to={"/"}
              style={({ isActive }) => ({
                color: isActive ? "green" : "black",
              })}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/activity-log"}
              style={({ isActive }) => ({
                color: isActive ? "green" : "black",
              })}
            >
              Activity Log
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/goal"}
              style={({ isActive }) => ({
                color: isActive ? "green" : "black",
              })}
            >
              Goals
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bagian kanan navbar */}
      <div className="navbar-end">
        <div className="avatar placeholder dropdown dropdown-end pr-4">
          <div
            tabIndex={0}
            role="button"
            className="bg-accent bg-neutral text-neutral-content w-12 rounded-full flex items-center justify-center cursor-pointer border border-blue-500"
          >
            <span>
              {
                profile?.name
                  ?.split(" ") // Ambil inisial dari nama
                  .map((word) => word[0]) // Ambil huruf pertama dari setiap kata
                  .join("") // Gabungkan inisial
                  .toUpperCase() // Ubah menjadi huruf kapital
              }
            </span>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-35 p-2 shadow"
          >
            <li>
              <NavLink
                to={"/profile"}
                style={({ isActive }) => ({
                  color: isActive ? "green" : "black",
                })}
              >
                Profile
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <button type="submit">Logout</button>
                </form>
              </li>
            ) : (
              <li>
                <NavLink
                  to={"/login"}
                  style={({ isActive }) => ({
                    color: isActive ? "green" : "black",
                  })}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
