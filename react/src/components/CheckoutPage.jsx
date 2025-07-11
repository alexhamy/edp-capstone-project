import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

var test_items = [
    {
        "id": 0,
        "img_id": "IMG_0",
        "Price": 45,
        "Type": "Button-Up Shirt",
        "Material": "Cashmere",
        "Season": "Spring",
        "Rating": 4.9,
        "Category": "Semi-Formal",
        "Description": "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    },
    {
        "id": 1,
        "img_id": "IMG_1",
        "Price": 27,
        "Type": "Tank top",
        "Material": "Nylon",
        "Season": "Fall",
        "Rating": 2.0,
        "Category": "Casual",
        "Description": "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    }
]

export default function ListPage(props) {
    const [checkoutData, setCheckoutData] = useState({
        "billing_info": {
            "address": "",
            "payment": ""},
        "items": test_items
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the current timestamp
        const submission = {
            ...checkoutData
        };

        console.log(checkoutData)

        try {
            const response = await fetch(`http://localhost:5000/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submission),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            // Handle post submission logic (like showing a success message)
        } catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }
    };

    return(
        <div className="row">
            <div className="col-4">
                <form onSubmit={handleSubmit} className="p-3">
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={checkoutData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment">Payment</label>
                        <input
                            type="text"
                            className="form-control"
                            id="payment"
                            name="payment"
                            value={checkoutData.payment}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        Checkout
                    </button>
                </form>
            </div>
        </div>
    )

    
}