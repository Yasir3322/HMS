import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalRegisterContext } from "../store/context/register-context";
import { useGlobalAuthContext } from "../store/context/auth-context";

const Header = () => {

  const navigate = useNavigate()

  const { setContinueWithEmail, continueWithEmail,
    setSignUp, signup } = useGlobalRegisterContext();
  const { isAuthenticated, setIsAuthenticated } = useGlobalAuthContext()

  function HandleRegisterClick() {
    setSignUp(!signup);
    setContinueWithEmail(continueWithEmail);
  }

  function handleLogOut() {
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('refreshtoken')
    localStorage.removeItem('role')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20">
      <ul className="flex justify-between items-center bg-black text-white py-3 px-4">
        <li>HARP</li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/allhostels"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            All Hostels
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            Contact
          </NavLink>
        </li>
        <li>
          {!isAuthenticated ? <NavLink
            to="/Register"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            Sign in
          </NavLink> : <NavLink
            to="/posthostel"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            Post Hostel
          </NavLink>
          }
        </li>
        {/* <li>
          <NavLink
            to="/Register"
            className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
          >
            <div onClick={() => HandleRegisterClick()}>Register</div>
          </NavLink>
        </li> */}
        <li>
          {isAuthenticated && <button onClick={() => handleLogOut()}>Logout</button>}
        </li>
        {
          isAuthenticated && <li>
            {localStorage.getItem('role') === 'user' ? <NavLink
              to="/UserDashboard/dashboard"
              className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
            >
              Dashboard
            </NavLink> : <NavLink
              to="/AdminDashboard/dashboard"
              className={({ isActive }) => `${isActive && "text-[#2296EA]"}`}
            >
              Dashboard
            </NavLink>}

          </li>
        }

      </ul>
    </header>
  );
};

export default Header;
