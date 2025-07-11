import { useEffect, useState } from 'react'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavigationHeader from './components/navheader';
import HomePage from './components/HomePage';
import ListPage from './components/ListPage';
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
    
    <div style={{display:"flex", width:'95%', flexDirection:"column", justifySelf:'center'}}>
      
      <Router>
        <NavigationHeader></NavigationHeader>
        <Routes>
        <Route path="/" element={<HomePage data={data}/>}/>
        <Route path="/products/:page" element={<ListPage data={data}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
