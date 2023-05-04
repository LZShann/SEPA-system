import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar } from './components';
import { Statistic, Import_Dataset, Interview, Task, Account} from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import { supabase } from './client';

const Homepage = ({token}) => {
    const { activeMenu } = useStateContext();

    let navigate = useNavigate()

    function handleLogout(){
      sessionStorage.removeItem('token')
      navigate('/')
    }
  
  return (
    <div className="flex relative">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <TooltipComponent content="Settings" position="Top">
          {/* // tooltip content */}
        </TooltipComponent>
      </div>
      {/* // sidebar content */}
      <div className={activeMenu ? 'w-72 fixed sidebar bg-white' : 'w-0'}>
        <Sidebar />
      </div>
      {/* // main content */}
      <div
        className={
          activeMenu
            ? 'bg-main-bg min-h-screen md:ml-72 w-full'
            : 'bg-main-bg w-full min-h-screen flex-2'
        }
      >
        <div className="fixed md:static bg-main-bg navbar w-full">
          <Navbar />
        </div>
        <div>
          {/* // user-specific content */}
          <h3>Welcome back, {token.user.user_metadata.fullName}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div>
          {/* // routes for the home page */}
          <Routes>
            <Route path="Homepage" element={<Statistic />}>
              <Route path="Statistic" element={<Statistic />} />
              <Route path="Task" element={<Task />} />
              <Route path="Import_Dataset" element={<Import_Dataset />} />
              <Route path="Interview" element={<Interview />} />
              <Route path="Account" element={<Account />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}
  
  export default Homepage;