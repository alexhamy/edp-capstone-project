import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavigationHeader from './components/navheader';
function App() {
  

  return (
    <div style={{display:"flex", width:'100%'}}>
      
      <Router>
      <NavigationHeader></NavigationHeader>
      </Router>
    </div>
  )
}

export default App
