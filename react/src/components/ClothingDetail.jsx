import { useParams } from "react-router"

export default function ClothingDetail(props) {
    const {id} = useParams()
    const item = props.data.filter((cloth)=>cloth.id === parseInt(id))[0];
    const rating = Math.floor(item?.Rating)

    let stars=[]
    for(let i = 0; i < rating; i++){
        stars.push(<img key={i + 10*item.id} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Star.svg/330px-Black_Star.svg.png" style={{height:'19px', width:'19px', marginBottom:'3px'}}/>)
    }
    for(let i = 0; i < (5-rating); i++){
        stars.push(<img key = {i+10*item.id + (5 - rating)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ic_star_outline_24px.svg/240px-Ic_star_outline_24px.svg.png" style={{height:'24px', width:'24px'}}/>)
    }
    const addToCart = () => {
        const newCart = [...props.cart, item]
        props.setCart(newCart);
    }
    return(
        <div style={{display:'flex', flexDirection:'column', textAlign:'left'}}>
            <div style={{display:'flex', flexDirection:'row'}}>
                <h2>{item?.Category + " " + item?.Material + " " + item?.Season + " " + item?.Type}</h2>
                <div style={{display:'flex', flexDirection:'column', marginLeft:'auto', marginRight:'0px'}}>
                    <h3>Rating: {item?.Rating}</h3>
                    <div style={{flexDirection:"row"}}> {stars}</div>
                </div>
            </div>
            <h3>Price: ${item?.Price}</h3>
            <h3>Size: {item?.Size}</h3>
            <h3>Category: {item?.Category}</h3>
            <h4>Description:</h4>
            <p>{item?.Description}</p>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    )
}