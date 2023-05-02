import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar } from './components';
import { Statistic, Import_Dataset, Interview, Task, Account} from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

import { supabase } from './client';

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        
        <div className="flex relative">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
            </TooltipComponent>
          </div> 
          {activeMenu ? (
            <div className="w-72 fixed sidebar bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Statistic />)} />
                <Route path="/Statistic" element={(<Statistic />)} />

                {/* pages  */}
                <Route path="/Task" element={(<Task />)} />
                <Route path="/Import_Dataset" element={(<Import_Dataset />)} />
                <Route path="/Interview" element={(<Interview />)} />

                {/* Admin */}
                <Route path="/Account" element={(<Account />)} />
              </Routes>
            </div>
            <Footer/>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;