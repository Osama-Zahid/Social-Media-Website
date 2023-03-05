import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './component/topbar/Topbarcss.css'
import {AuthContextProvider} from './redux/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </React.StrictMode>
);
