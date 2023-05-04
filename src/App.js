import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, SignUp, Homepage } from './pages';
import { Statistic, Import_Dataset, Interview, Task, Account} from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';



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
    </div>
  )
}

export default App;