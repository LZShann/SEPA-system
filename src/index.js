import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './Login';
import Register from './Register';
import { ContextProvider } from './contexts/ContextProvider';

ReactDOM.render(
    <React.StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);