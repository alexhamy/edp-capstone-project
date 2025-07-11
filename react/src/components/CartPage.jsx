import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClothingCard from "./ClothingCard";
export default function CartPage(props){
    let navigate = useNavigate()
    // console.log(props.cart)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let sum = 0;
        if(props.cart?.length > 0){
            props.cart.forEach((item) => {
                sum += item.Price
            })
        }
        setTotal(sum)
    },[props])        
    return(
        <div>
            <h2>Items in cart:</h2>
            <h2>Total: ${total}</h2>
            <button style={{width: '100%'}} onClick= {() => navigate("/checkout")}>Checkout</button>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows:'repeat(10, 1fr)', gridColumnGap:'0px', gridRowGap:'0px'}}>
                {props.cart?.map((selected) => {return (<ClothingCard item={selected}/>)})}
            </div>
        </div>
        
    )
}