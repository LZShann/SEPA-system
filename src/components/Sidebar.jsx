import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { managerLinks, staffLinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { supabase } from "../client";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  // const [ userRole, setUserRole ] = useState();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  async function authCheck() {
    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
      // User not logged in
      window.location.replace('/');
    }
  };

  // async function retrieveUserRole() {
  //   const { data, error } = await supabase.auth.refreshSession()
  //   const { session, user } = data;

  //   const { data: user_data, error: user_error } = await supabase
  //     .from('users_data')
  //     .select('*')
  //     .eq('uuid', user.id);

  //   if (user_error) {
  //     console.error('Error retrieving data:', user_error);
  //   }
  //   else {
  //     console.log('Retrieved data:', user_data);
  //     setUserRole(user_data[0].role);
  //   }
  // };

  useEffect(() => {
    authCheck();
    // retrieveUserRole();
  });

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
  //           setUserRole(data['data'][0]['role']);
  //         });
  //     }
  //   });
  // });

  const userRole = sessionStorage.getItem('currentUserRole');

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-green-100 m-2';

  if (userRole === 'Manager') {
    return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/Statistic" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900">
              <SiShopware /> <span>HR KPI</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-green-100 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
            <div className={userRole === 'Manager'}>
              <div className="StaffTabs">
                <div className="mt-10 ">
                    {managerLinks.map((item) => (
                      <div key={item.title}>
                        <p className="text-gray-400 m-3 mt-4 uppercase">
                          {item.title}
                        </p>
                        {item.links.map((link) => (
                          <NavLink
                            to={`/${link.name}`}
                            key={link.name}
                            onClick={handleCloseSideBar}
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? currentColor : '',
                            })}
                            className={({ isActive }) => (isActive ? activeLink : normalLink)}
                          >
                            {link.icon}
                            <span className="uppercase">{link.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
        </>
      )}
    </div>
  );
  } else if (userRole === 'Staff') {
    return (
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/Statistic" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900">
              <SiShopware /> <span>HR KPI</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
            <div className={userRole === 'Staff'}>
              <div className="StaffTabs">
                <div className="mt-10 ">
                    {staffLinks.map((item) => (
                      <div key={item.title}>
                        <p className="text-gray-400 m-3 mt-4 uppercase">
                          {item.title}
                        </p>
                        {item.links.map((link) => (
                          <NavLink
                            to={`/${link.name}`}
                            key={link.name}
                            onClick={handleCloseSideBar}
                            style={({ isActive }) => ({
                              backgroundColor: isActive ? currentColor : '',
                            })}
                            className={({ isActive }) => (isActive ? activeLink : normalLink)}
                          >
                            {link.icon}
                            <span className="capitalize ">{link.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
        </>
      )}
    </div>
    );
  }
  else {
    return <div className="App">Loading...</div>;
  }  
};

export default Sidebar