import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth() || { user: null };
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          InterviewPrepAI
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavLink to="/" text="Home" />
          <NavLink to="/dashboard" text="Dashboard" />
          <NavLink to="/interview" text="Interview" />
          {user && <NavLink to="/recommendations" text="Recommendations" />}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
                  <p className="font-semibold">{user?.name || "User"}</p>
                  <p className="text-sm text-gray-500">
                    {user?.email || "No email"}
                  </p>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="mt-2 w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="mt-2 w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" text="Login" />
              <NavLink to="/register" text="Register" />
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 py-4 space-y-3">
          <NavLink to="/" text="Home" toggleMenu={() => setIsOpen(false)} />
          <NavLink
            to="/dashboard"
            text="Dashboard"
            toggleMenu={() => setIsOpen(false)}
          />
          <NavLink
            to="/interview"
            text="Interview"
            toggleMenu={() => setIsOpen(false)}
          />
          {user && (
            <NavLink
              to="/recommendations"
              text="Recommendations"
              toggleMenu={() => setIsOpen(false)}
            />
          )}
          {user ? (
            <>
              <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <p className="text-white">{user?.name || "User"}</p>
              <p className="text-gray-300 text-sm">
                {user?.email || "No email"}
              </p>
              <button
                onClick={() => {
                  navigate("/edit-profile");
                  setIsOpen(false);
                }}
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                  navigate("/login");
                }}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                text="Login"
                toggleMenu={() => setIsOpen(false)}
              />
              <NavLink
                to="/register"
                text="Register"
                toggleMenu={() => setIsOpen(false)}
              />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

type NavLinkProps = {
  to: string;
  text: string;
  toggleMenu?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({ to, text, toggleMenu }) => (
  <Link
    to={to}
    onClick={toggleMenu}
    className="px-3 py-2 rounded-lg hover:text-blue-400 transition"
  >
    {text}
  </Link>
);

export default Navbar;
