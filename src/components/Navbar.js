import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  Menu,
  Clear,
  TurnedIn,
  TurnedInNot,
  NavigateNext,
  NavigateBefore,
} from "@material-ui/icons";

export function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [navbarPinned, setNavbarPinned] = React.useState(false);

  let { pathname } = useLocation();
  let history = useHistory();

  const steps = [
    "client",
    "rates",
    "inventory",
    "estimate",
    "materials",
    "overview",
  ];
  const currentIndex = steps.indexOf(pathname.substring(1));

  const nextStep = () => {
    if (steps.length - 1 > currentIndex)
      history.push("/" + steps[currentIndex + 1]);
  };

  const previousStep = () => {
    if (0 < currentIndex) history.push("/" + steps[currentIndex - 1]);
  };

  const NavLink = ({ to, text }) => {
    return (
      <li className="px-2 nav-item">
        <Link
          onClick={() => {
            if (!navbarPinned) setNavbarOpen(!navbarOpen);
          }}
          className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ml-2"
          to={to}
          replace
        >
          {text}
        </Link>
      </li>
    );
  };

  return (
    <nav className="container mx-auto flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-purple-900 shadow-md border-b-1 border-black ">
      {/* <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-black "> */}
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/">
            <div className="flex text-white   cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent  outline-none focus:outline-none ">
              <img
                className="bg-white w-6 h-6 p-1"
                src={`${process.env.PUBLIC_URL}/favicon.ico`}
                alt=""
              />
              <span className="px-2 text-white">
                <strong>SFM</strong>
              </span>
            </div>
          </Link>
          <div className="flex ">
            {navbarOpen ? (
              <button
                type="button"
                onClick={() => setNavbarPinned(!navbarPinned)}
                className="text-white opacity-30 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              >
                {navbarPinned ? <TurnedIn /> : <TurnedInNot />}
              </button>
            ) : null}

            <button
              className="text-white  cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none "
              type="button"
              onClick={previousStep}
            >
              <NavigateBefore />
            </button>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={nextStep}
            >
              <NavigateNext />
            </button>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? <Clear /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <NavLink to="/moves" text="Moves" />
            <NavLink to="/estimates" text="Estimates" />
            <NavLink to="/paramount" text="Paramount" />
            <NavLink to="/dispatch" text="Dispatch" />
            <NavLink to="/warehouse" text="Warehouse" />
            <NavLink to="/tools" text="tools" />
          </ul>
        </div>
      </div>
    </nav>
  );
}
