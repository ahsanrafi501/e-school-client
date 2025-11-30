import React from "react";
import { Link, useLocation } from "react-router";
import UseAuth from "../../Hook/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = UseAuth();
  const location = useLocation();
  console.log(location)
  const handleLogOut = () => {
    signOutUser()
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        // navigate('/')
      })
      .catch((errors) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "error",
        });
        console.log(errors);
      });
  };
  const links = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/"}>Courses</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-sm bg-[#49BBBD] px-7">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost text-xl">E-School</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a onClick={handleLogOut} className="btn btn-primary">
            Logout
          </a>
        ) : (
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
