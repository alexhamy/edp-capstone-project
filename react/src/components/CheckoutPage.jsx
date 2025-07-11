import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function CheckoutPage(props) {
    // const [checkoutData, setCheckoutData] = useState({
    //     "billing_info": {
    //         "address": "",
    //         "payment": ""},
    //     "items": []
    // });
    const [payment, setPayment] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [stateCode, setStateCode] = useState('')
    const [zip, setZip] = useState('')
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value} = e.target;
        setCheckoutData({
            ...checkoutData,
            billing_info: {
                ...checkoutData.billing_info,
                [name]: value}
        });
        console.log(checkoutData.billing_info)
    };

    const handleCheckout = async (event) => {
        event.preventDefault()
        const orderBody = {
            "items": props.data,
            "billing_info": {
                "address": `${address}\n${city}, ${stateCode} ${zip}`,
                "payment": payment
            }
        }
        console.log(orderBody)
        try {
                const response = await fetch(`http://localhost:5000/api/checkout`, {
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
                console.log(data);
                // Handle post submission logic (like showing a success message)
                //navigate('/')
                props.setCart([])
            } 
        catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }

    }

    return(
        <div className="row">
            <div className="col-4">
                <form className="p-3">
                    <div className="form-group" style={{display:'flex', flexDirection:'column'}}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            placeholder="Enter your address"
                        />
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="Enter your city"
                        />
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={stateCode}
                            onChange={(event) => setStateCode(event.target.value)}
                            placeholder="Enter your state code"
                        />
                        <label htmlFor="zip">Zip Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                            value={zip}
                            onChange={(event) => setZip(event.target.value)}
                            placeholder="Enter your address"
                        />
                        <label htmlFor="payment">Payment</label>
                        <input
                            type="text"
                            className="form-control"
                            id="payment"
                            name="payment"
                            value={payment}
                            onChange={(event) => setPayment(event.target.value)}
                            placeholder="Enter your payment"

                        />
                    </div>                    
                    <button className="btn btn-primary" style={{width:'100%', marginTop:'20px', marginBottom:'20px'}} onClick = {handleCheckout}>
                        Checkout
                    </button>
                    
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        {props.data.map(item => (
                            <div className="order-item" style={{marginTop:"5px", marginBottom:"5px"}}>
                                <span>{item.Type}</span>
                                <span>${item.Price.toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="order-total" style={{marginTop:'20px'}}>
                            <span style={{fontWeight:'bold'}}>Total: </span>
                            <span>${props.data.reduce((sum, item) => sum + item.Price, 0).toFixed(2)}</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

    
}