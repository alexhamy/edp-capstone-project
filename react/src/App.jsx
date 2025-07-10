import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavigationHeader from './components/navheader';
import HomePage from './components/HomePage';
function App() {
  

  return (
    <div style={{display:"flex", width:'100%', flexDirection:"column"}}>
      
      <Router>
        <NavigationHeader></NavigationHeader>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
