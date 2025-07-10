import { useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavigationHeader from './components/navheader';
import HomePage from './components/HomePage';
function App(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await fetch("http://localhost:5000/api").then((response) =>{
        if(response.status !== 200){
          throw new Error("Error fetching data!")
        }
        return response.json()
      }
      ).then((responseData) => {
        setData(responseData);
      })
    }
    getData();
  }, [])
  return (
    
    <div style={{display:"flex", width:'100%', flexDirection:"column"}}>
      
      <Router>
        <NavigationHeader></NavigationHeader>
        <Routes>
        <Route path="/" element={<HomePage data={data}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
