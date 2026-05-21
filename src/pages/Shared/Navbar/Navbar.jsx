import { Button } from "@/components/ui/button";
import Logo from "@/CustomComponents/Logo";
import useAuth from "@/hooks/useAuth";

import { useEffect, useRef, useState } from "react";
import { CgMenuRound } from "react-icons/cg";
import { NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  // close when outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li className="list-none">
        <NavLink to="/services">Services</NavLink>
      </li>

      <li className="list-none">
        <NavLink to="/coverage">Coverage</NavLink>
      </li>

      <li className="list-none">
        <NavLink to="/aboutus">About Us</NavLink>
      </li>

      <li className="list-none">
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>

      <li className="list-none">
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>

      {user && (
        <li className="list-none">
          <NavLink to="/dashboard/my-parcels">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav
      ref={menuRef}
      className="relative flex items-center justify-between py-4 px-4 mb-2 rounded-[15px] bg-white"
    >
      {/* Logo */}
      <Logo />

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
        {links}
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        {user?.displayName}

        {user?.email ? (
          <button
            onClick={handleLogOut}
            className="px-4 py-2 rounded-[20px] hover:bg-lime-600 bg-gray-500 text-white"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-gray-500 text-white hover:bg-lime-600 px-4 py-2 rounded-[20px]"
          >
            Login
          </NavLink>
        )}

        <NavLink
          to="/rider"
          className="bg-primary text-white hover:bg-lime-600 px-4 py-2 rounded-[20px]"
        >
          Be a Rider
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden bg-primary rounded-full p-2 text-white"
      >
        <CgMenuRound size={25} />
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-20 z-20 left-0 w-full bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 md:hidden ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >
        <ul className="flex flex-col gap-4 p-5 text-gray-700 font-medium">
          {links}

          <div className="flex flex-col gap-3 pt-4">
            {user?.email ? (
              <button
                onClick={handleLogOut}
                className="px-4 py-2 rounded-[20px] hover:bg-lime-600 bg-gray-500 text-white"
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/login"
                className="bg-gray-500 text-center text-white hover:bg-lime-600 px-4 py-2 rounded-[20px]"
              >
                Login
              </NavLink>
            )}

            <NavLink
              to="/rider"
              className="bg-primary text-center text-white hover:bg-lime-600 px-4 py-2 rounded-[20px]"
            >
              Be a Rider
            </NavLink>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;