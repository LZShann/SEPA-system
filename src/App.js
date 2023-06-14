import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Statistic, Import_Dataset, Interview, Task, Account, Login, SignUp, FormReviewPage, FormReviewPosition, History } from './pages';
import './App.css';

const App = () => {

  return (
    <div>
      <BrowserRouter>
          <div>
            <Routes>
              {/* login & signup  */}
              <Route index element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />

              {/* pages */}
              <Route path="/Statistic" element={<Statistic />} />
              <Route path="/Task" element={<Task />} />
              <Route path="/Import_Dataset" element={<Import_Dataset />} />
              <Route path="/Interview" element={ <div> <Interview /> <History/> </div> } />
              <Route path="/Account" element={<Account />} />

              {/* Interview pop up pdf */}
              <Route path="/form-review-page/:id" element={<FormReviewPage />} />
              <Route path="/form-review-position/:id" element={<FormReviewPosition />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
};

export default App;