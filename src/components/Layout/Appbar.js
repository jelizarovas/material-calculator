import React, { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, Clear, TurnedIn, TurnedInNot } from "@material-ui/icons";

export const Appbar = memo((props) => {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const url = `${process.env.PUBLIC_URL}/favicon.ico`;

  const toggleOpen = useCallback(() => (!pinned ? setOpen((o) => !o) : null), [pinned]);
  const togglePin = useCallback(() => setPinned((p) => !p), []);

  const NavLink = ({ to, text }) => {
    return (
      <li className="px-2 nav-item">
        <Link
          onClick={toggleOpen}
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
    <nav className=" mx-auto flex flex-wrap items-center justify-between px-2 py-1 navbar-expand-lg bg-purple-900 shadow-md border-b-2 border-purple-800 ">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to="/">
            <div className="flex text-white   cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent  outline-none focus:outline-none ">
              <img className="bg-white w-6 h-6 p-1" src={url} alt="" />
              <span className="px-2 text-white">
                <strong>SFM</strong>
              </span>
            </div>
          </Link>
          <div className="flex ">
            {open && (
              <button
                type="button"
                onClick={togglePin}
                className="text-white opacity-30 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              >
                {pinned ? <TurnedIn /> : <TurnedInNot />}
              </button>
            )}

            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={toggleOpen}
            >
              {open ? <Clear /> : <Menu />}
            </button>
          </div>
        </div>
        <div className={"lg:flex flex-grow items-center" + (open ? " flex" : " hidden")} id="example-navbar-danger">
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
});
