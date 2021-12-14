import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Users from "./components/Users/Users";
import NoMatch from "./components/NoMatch/NoMatch";

const User = React.lazy(() => import("./components/User/User"));

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Users />} />
                  <Route
                      path="user/:userid"
                      element={
                          <React.Suspense fallback={<>...</>}>
                              <User />
                          </React.Suspense>
                      }
                  />
                  <Route path="*" element={<NoMatch />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
