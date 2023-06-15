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
  //
  const [ formData, setFormData ] = useState([]);

  const userName = sessionStorage.getItem('currentUserName');

  // async function retrieveName() {
  //   const { data, error } = await supabase.auth.refreshSession()
  //   const { session, user } = data;

  //   const { data: user_data, error: user_error } = await supabase
  //     .from('users_data')
  //     .select('*')
  //     .eq('uuid', user.id);

  //   if (user_error) {
  //     console.error('Error retrieving data:', user_error);
  //   } else {
  //     console.log('Retrieved data:', user_data);
  //     setFormData(user_data);
  //   }
  // };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
    
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  // useEffect(() => {
  //   retrieveName();
  // }, []);

  // useEffect(() => {
  //   supabase.auth.getSession().then((data, error) => {
  //     // Check if session is found
  //     if (data['data']['session'] == null) {
  //       // User not logged in
  //       window.location.replace('/');
  //     }
  //     else {
  //       const userAuthData = data['data']['session'];
        
  //       // Fetch user role
  //       supabase
  //         .from('users_data')
  //         .select('*')
  //         .eq('uuid', userAuthData['user']['id'])
  //         .then((data, error) => {
  //           setUserName(data['data'][0]['name']);
  //         });
  //     }
  //   });
  // });

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
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userName}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;