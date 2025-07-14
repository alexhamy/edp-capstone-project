import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothingCard from "./ClothingCard";
import CartClothingCard from "./CartClothingCard";
export default function CartPage(props){
    let navigate = useNavigate()
    // console.log(props.cart)
    const [total, setTotal] = useState(0)
    const [suggestedItems, setSuggestedItems] = useState([])
    useEffect(() => {
        let sum = 0;
        if(props.cart?.length > 0){
            props.cart.forEach((item) => {
                sum += item.Price
            })
        }
        setTotal(sum)
    },[props])
    useEffect(() => {
        const orderBody = props.cart
        //console.log(orderBody)
        async function getData(){
            try {
                const response = await fetch(`http://localhost:5000/api/model`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderBody),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                //console.log(data.data);
                setSuggestedItems(data.data)
            } 
        catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }
        }
        getData();
    },[props.cart])
    return(
        <div>
            <h2>Items in cart:</h2>
            <h2>Total: ${total}</h2>
            <button style={{width: '100%'}} onClick= {() => navigate("/checkout")}>Checkout</button>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows:'repeat(1, 1fr)', gridColumnGap:'0px', gridRowGap:'0px'}}>
                {props.cart?.map((selected) => {return (<CartClothingCard item={selected} cart={props.cart} setCart={props.setCart}/>)})}
            </div>
            <h2>Consider these items:</h2>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows:'repeat(1, 1fr)', gridColumnGap:'0px', gridRowGap:'0px'}}>
                {suggestedItems?.map((selected) => {return (<ClothingCard item={selected}/>)})}
            </div>
        </div>
        
    )
}