import { useEffect, useState } from 'react'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavigationHeader from './components/navheader';
import HomePage from './components/HomePage';
import ListPage from './components/ListPage';
import ClothingDetail from './components/ClothingDetail';
import CartPage from './components/CartPage';
import CategoryPage from './components/CategoryPage';
import CheckoutPage from './components/CheckoutPage';
import SearchPage from './components/SearchPage';

function App(props) {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState([])
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
  },[])
  return (
    
    <div style={{display:"flex", width:'95%', flexDirection:"column", justifySelf:'center'}}>
      
      <Router>
        <NavigationHeader cart={cart} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}></NavigationHeader>
        <Routes>
        <Route path="/" element={<HomePage data={data}/>}/>
        <Route path="/products/:page" element={<ListPage data={data}/>}/>
        <Route path="/product/:id" element={<ClothingDetail data={data} cart = {cart} setCart={setCart}/>}/>
        <Route path="/cart/" element={<CartPage cart = {cart} setCart={setCart}/>}/>
        <Route path="/checkout" element={<CheckoutPage data={cart} setCart={setCart}/>}/>
        <Route path="/categories/" element={<CategoryPage data = {data}/>}/>
        <Route path="/search" element={<SearchPage data = {data} searchTerm = {searchTerm}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
