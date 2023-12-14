import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-transparent">
      <nav className="navbar navbar-expand-lg align-items-baseline shadow">
        <div className="container">
          <a className="navbar-brand text-lg-center rounded" href="/">
            <b className="text-warning fs-4">RESERVE</b>
            {/* <b className="text-primary">- Platform</b> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-sm m-1">Tickets</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm m-1">Contact Us</button>
              </li>
              {/* <li className="nav-item">
                <button className="btn btn-success btn-sm m-1">Contacts</button>
              </li> */}
            </ul>
            <div className="navbar-nav mb-2 mb-lg-0">
              <Link
                className="nav-item btn btn-warning p-1 m-1 text-light"
                style={{ width: 100 }}
                to = "/login"
              >
                <b>Login</b>
              </Link>
              <Link
                className="nav-item btn btn-warning p-1 m-1 text-light"
                style={{ width: 100 }}
                to = "/register"
              >
                <b>Register</b>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
