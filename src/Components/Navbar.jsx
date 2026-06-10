import React from "react";
import { NavLink } from "react-router";
import HireMe from "./HireMe/HireMe";
import Switch from "./Switch/Switch";
import { useTheme } from "../Components/Context/ThemeContext";

const Navbar = () => {
  const { isDarkMode } = useTheme();
  
  const navStyle = ({ isActive }) =>
    isActive
      ? `text-purple-500 font-semibold border-b-2 border-purple-500 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`
      : `transition ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-500'}`;

  const links = (
    <>
      <NavLink className={navStyle} to="/">Home</NavLink>
      <NavLink className={navStyle} to="/about">About</NavLink>
      <NavLink className={navStyle} to="/skill">Skills</NavLink>
      <NavLink className={navStyle} to="/project">Projects</NavLink>
      <NavLink className={navStyle} to="/services">Services</NavLink>
    </>
  );

  return (
    <div className={`navbar sticky top-0 z-50 backdrop-blur-xl rounded-full transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-800/80 border border-purple-700' 
        : 'bg-purple-100/80 border border-purple-300'
    }`}>
      
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className={`btn btn-ghost lg:hidden ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 p-4 w-52 rounded-xl shadow-lg gap-2 ${
              isDarkMode 
                ? 'bg-gray-800 border border-purple-700' 
                : 'bg-white border border-purple-200'
            }`}>
            {links}
          </ul>
        </div>

        <h1 className="ml-4 text-xl font-bold bg-gradient-to-r from-[#7A5AF8] to-[#BE6AFD] bg-clip-text text-transparent">
          Portfolio
        </h1>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-8">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="ml-4 flex gap-5 h-10">
        <div className="h-10 flex items-center">
          <Switch />
        </div>

        <div className="h-10 flex items-center">
          <HireMe />
        </div>
      </div>
    </div>
  );
};

export default Navbar;