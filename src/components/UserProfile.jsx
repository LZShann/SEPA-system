import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/profileicon.jpg';


const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [ formData, setFormData ] = useState([]);

  const navigate = useNavigate();

  const userName = sessionStorage.getItem('currentUserName');
  const userRole = sessionStorage.getItem('currentUserRole');
  const userEmail = sessionStorage.getItem('currentUserEmail');

  async function handleLogout(){
    const { error } = await supabase.auth.signOut()
    sessionStorage.clear();
    navigate('/')
  };

  // async function handleRetrieve(){
  //   const { data, error } = await supabase.auth.refreshSession()
  //   const { session, user } = data;

  //  const { data: user_data, error: user_error } = await supabase
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

  // useEffect(() => {
  //   handleRetrieve();
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
  //           setUserRole(data['data'][0]['role']);
  //           setUserEmail(data['data'][0]['email']);
  //         });
  //     }
  //   });
  // }, []);

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 border-color border rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          {/* {formData.map((item) => ( */}
            <div>
              <p className="font-semibold text-xl">{userName}</p>
              <p className="text-gray-500 text-sm">{userRole}</p>
              <p className="text-gray-500 text-sm font-semibold">{userEmail}</p>
            </div >
          {/* ))} */}
        </div>
        
      </div>
      <div className="mt-5" onClick={handleLogout}>
          <Button
            color="white"
            bgColor={currentColor} 
            text="Logout"
            borderRadius="10px"
            width="full"
          />
      </div>
    </div>

  );
};

export default UserProfile;