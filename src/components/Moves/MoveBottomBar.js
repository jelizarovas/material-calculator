import React from "react";
import { NavigateNext, NavigateBefore, NoteAdd, Menu, TurnedIn, TurnedInNot, Clear } from "@material-ui/icons";
import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { MoveMenu } from "./MoveMenu";

import { isMobile } from "react-device-detect";

export const MoveBottomBar = ({ showSideMenu, setshowSideMenu }) => {
  const [navbarPinned, setNavbarPinned] = React.useState(false);

  let { pathname } = useLocation();
  let { url } = useRouteMatch();

  const newp = pathname.split("/");

  let history = useHistory();

  const steps = ["client", "rates", "estimate", "materials", "overview"];
  const currentIndex = steps.indexOf(newp[newp.length - 1]);

  const nextStep = () => {
    if (steps.length - 1 > currentIndex) history.push(`${url}/${steps[currentIndex + 1]}`);
  };

  const previousStep = () => {
    if (0 < currentIndex) history.push(`${url}/${steps[currentIndex - 1]}`);
  };

  const note = () => {
    return;
  };

  const menuToggle = () => {
    return setshowSideMenu(!showSideMenu);
  };

  const isLastStep = currentIndex === steps.length - 1;

  return (
    <div className={isMobile ? "fixed bg-white z-10 bottom-0  w-full" : " bg-white rounded-lg w-full mt-0 shadow-xs"}>
      {isMobile && (
        <MoveMenu showSideMenu={showSideMenu} setshowSideMenu={setshowSideMenu} navbarPinned={navbarPinned} />
      )}
      <div className="w-full justify-between flex">
        <div className="flex">
          <Button onClick={menuToggle} text="Menu" Icon={showSideMenu ? Clear : Menu} iconPosition="left" />
          {showSideMenu && (
            <Button
              onClick={() => {
                setNavbarPinned(!navbarPinned);
              }}
              text="Pin Menu"
              Icon={navbarPinned ? TurnedIn : TurnedInNot}
              iconPosition="left"
              inactive={true}
            />
          )}
        </div>
        <div className="flex">
          <Button onClick={note} text="Note" Icon={NoteAdd} iconPosition="left" />
          <Button
            onClick={previousStep}
            text="Previous"
            Icon={NavigateBefore}
            iconPosition="left"
            inactive={currentIndex === 0}
          />
          <Button onClick={nextStep} text="Next" Icon={NavigateNext} iconPosition="right" inactive={isLastStep} />
        </div>
      </div>
      {!isMobile && (
        <MoveMenu showSideMenu={showSideMenu} setshowSideMenu={setshowSideMenu} navbarPinned={navbarPinned} />
      )}
    </div>
  );
};

const Button = ({ onClick, text, Icon, iconPosition, inactive = false }) => {
  return (
    <button
      className={`flex px-2   text-xs leading-none  py-4 mx-1 border border-solid border-transparent rounded outline-none focus:outline-none `}
      type="button"
      onClick={onClick}
    >
      {iconPosition === "left" ? <Icon fontSize="small" color={inactive ? "disabled" : "inherit"} /> : null}
      {/* <span className="hidden md:block">{text}</span> */}
      {iconPosition === "right" ? <Icon fontSize="small" color={inactive ? "disabled" : "inherit"} /> : null}
    </button>
  );
};
