import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "../api/store.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
  <React.StrictMode>
  <Router>
        <Routes>
          <Route path="/" element={<App />}></Route>
        </Routes>
      </Router>
  </React.StrictMode>
  </Provider>
)
