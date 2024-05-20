import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import Products from './components/Products.jsx'
import Additem from './components/Additem.jsx'
import Addrew from './components/Addrew.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addrew" element={<Addrew/>} />
        <Route path="/home/add" element={<Additem />} />
        <Route path="/:id" element={<Products />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
