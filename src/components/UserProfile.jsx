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

  const userID = sessionStorage.getItem('userID');
  console.log('I\'m User Profile: ', userID);

  async function handleLogout(){
    const { error } = await supabase.auth.signOut()
    sessionStorage.clear();
    navigate('/')
  };

  async function handleRetrieve(){
    const { data, error } = await supabase
    .from('users_data')
    .select('*')
    .eq('id', userID)

    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      console.log('Retrieved data:', data);
      setFormData(data);
    }
  };

  useEffect(() => {
    handleRetrieve();
  }, []);
  

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96">
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
          {formData.map((item) => (
            <div key={item.id}>
              <p className="font-semibold text-xl">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.role}</p>
              <p className="text-gray-500 text-sm font-semibold">{item.email}</p>
            </div >
          ))}
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