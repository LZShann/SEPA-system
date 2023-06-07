import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Navbar, Footer, Sidebar } from '../components';
import { Statistic, Import_Dataset, Interview, Task, Account, FormReviewPage, FormReviewPosition, History } from '.';
import '../App.css';

import { useStateContext } from '../contexts/ContextProvider';

const Homepage = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
        <div className="flex relative">
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
                    <Route path="/Statistic" element={(<Statistic />)} />

                    <Route path="/Task" element={(<Task />)} />
                    <Route path="/Import_Dataset" element={(<Import_Dataset />)} />
                    <Route path="/Interview" element={(<Interview />)} />

                    <Route path="/Account" element={(<Account />)} />
                    <Route path="/Interview" element={ <div> <Interview /> <History/> </div> } />
                    <Route path="/form-review-page/:id" element={<FormReviewPage />} />
                    <Route path="/form-review-position/:id" element={<FormReviewPosition />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
    </div>
  );
};

export default Homepage;