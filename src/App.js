import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, SignUp, Homepage } from './pages';
import { Statistic, Import_Dataset, Interview, Task, Account} from './pages';
import './App.css';

<<<<<<< Updated upstream
import { useStateContext } from './contexts/ContextProvider';



=======
>>>>>>> Stashed changes
const App = () => {

  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <div>
<<<<<<< Updated upstream
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
=======
      <Routes>
        <Route path={'/'} element={<Login setToken={setToken}/>}/>
        <Route path={'/SignUp'} element={<SignUp />}/>
        <Route path={'/Login'} element={<Login setToken={setToken}/>}/>
        {token?<Route path={'/Homepage/*'} element={<Homepage token={token}/>}>
              <Route path="Statistic" element={<Statistic />} />
              <Route path="Task" element={<Task />} />
              <Route path="Import_Dataset" element={<Import_Dataset />} />
              <Route path="Interview" element={<Interview />} />
              <Route path="Account" element={<Account />} />
        </Route>:''}
      </Routes>
>>>>>>> Stashed changes
    </div>
  )
}

export default App;