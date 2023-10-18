import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./features/dashboard/views/Dashboard";
import Registration from "./features/login/components/registration";
import reportWebVitals from './reportWebVitals';
import RegisterAlly from './features/dashboard/components/RegisterAlly';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element = {<App />} />
        <Route path="login" element = {<Registration />} />
        <Route path="dashboard" element = {<Dashboard />} />
        <Route path="register-ally" element = {<RegisterAlly />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  //document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
