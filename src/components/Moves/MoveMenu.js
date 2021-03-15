import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export const MoveMenu = ({ showSideMenu }) => {
  const sideMenuStatus = showSideMenu ? "" : "hidden";
  return (
    <div className={`absolute p-2 z-10 bg-white ${sideMenuStatus}`}>
      <ul className="flex flex-col  list-none lg:ml-auto">
        <NavLink to="client" text="Client" />
        <NavLink to="rates" text="rates" />
        <NavLink to="inventory" text="inventory" />
        <NavLink to="estimate" text="estimate" />
        <NavLink to="materials" text="materials" />
        <NavLink to="overview" text="overview" />
      </ul>
    </div>
  );
};

const NavLink = ({ to, text }) => {
  let { url } = useRouteMatch();

  return (
    <li className="px-2 nav-item">
      <Link
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75 ml-2"
        to={`${url}/${to}`}
        replace
      >
        {text}
      </Link>
    </li>
  );
};
