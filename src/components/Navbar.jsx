import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/profileicon.jpg';

import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { supabase } from "../client";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-green-100"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  const userName = sessionStorage.getItem('currentUserName');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
    
  });

  useEffect(() => {
    if (screenSize <= 1400) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 relative bg-main-bg">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-green-100 rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8 text"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-base">Welcome,</span>{' '}
              <span className="text-gray-400 font-semibold ml-1 text-base">
                {userName}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-xl" />
          </div>
        </TooltipComponent>

        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;