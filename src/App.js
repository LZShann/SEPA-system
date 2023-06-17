import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Statistic, Import, Interview, Task, Account, Login, SignUp, FormReviewPage, FormReviewPosition} from './pages';
import './App.css';
import FormReviewBigFive from './pages/FormReviewBigFive';
import FormReviewb5Personal from './pages/FormReviewb5Personal';

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
              <Route path="/Import" element={<Import />} />
              <Route path="/Interview" element={<Interview />} />
              <Route path="/Account" element={<Account />} />

              {/* Interview pop up pdf */}
              <Route path="/form-review-page/:id" element={<FormReviewPage />} />
              <Route path="/form-review-position/:id" element={<FormReviewPosition />} />
              <Route path="/form-review-bigfivepersonal/:id" element={<FormReviewb5Personal />} />
              <Route path="/form-review-bigfive/:id" element={<FormReviewBigFive />} />
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
};

export default App;