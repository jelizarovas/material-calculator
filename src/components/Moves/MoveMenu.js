import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

export const MoveMenu = ({ showSideMenu, setshowSideMenu, navbarPinned }) => {
  const sideMenuStatus = showSideMenu ? "" : "hidden";

  const onClick = () => {
    if (!navbarPinned) setshowSideMenu(false);
  };
  return (
    <div className={`  bg-white ${sideMenuStatus}   lg:rounded-b-lg w-full `}>
      <ul className="flex flex-col  list-none lg:ml-auto m-4">
        <MenuLink to="client" text="Client" onClick={onClick} />
        <MenuLink to="rates" text="rates" onClick={onClick} />
        <MenuLink to="inventory" text="inventory" onClick={onClick} />
        <MenuLink to="estimate" text="estimate" onClick={onClick} />
        <MenuLink to="materials" text="materials" onClick={onClick} />
        <MenuLink to="overview" text="overview" onClick={onClick} />
      </ul>
    </div>
  );
};

const MenuLink = ({ to, text, onClick }) => {
  let { url } = useRouteMatch();
  return (
    <li className="px-2 nav-item">
      <NavLink
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75 ml-2 "
        to={`${url}/${to}`}
        activeClassName="text-red-500"
        onClick={onClick}
        // replace
      >
        {text}
      </NavLink>
    </li>
  );
};
