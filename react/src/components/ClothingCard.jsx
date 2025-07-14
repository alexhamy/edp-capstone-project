import { useNavigate } from "react-router"

export default function ClothingCard(props){
    const item = props.item
    //console.log(item)
    const rating = Math.floor(item.Rating)
    let navigate = useNavigate()
    let stars=[]
    for(let i = 0; i < rating; i++){
        stars.push(<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Black_Star.svg/330px-Black_Star.svg.png" style={{height:'19px', width:'19px', marginBottom:'3px'}}/>)
    }
    for(let i = 0; i < (5-rating); i++){
        stars.push(<img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ic_star_outline_24px.svg/240px-Ic_star_outline_24px.svg.png" style={{height:'24px', width:'24px'}}/>)
    }
    const handleClick = () => {
        navigate(`/product/${item.id}`)
    }
    return(
        <div style={{border: "1px solid black", borderRadius:"20px", margin:"10px", padding:"5px", flexDirection:"column", width:"300px", height:'220px', cursor:'pointer'}} onClick={handleClick}>
            <h3 style={{height:'30px'}}>{`${item.Category} ${item.Material} ${item.Season} ${item.Type}`}</h3>
            <h4>Price: ${item.Price}</h4>
            <h4>Size: {item.Size}</h4>
            <h4>Category: {item.Category}</h4>
            {stars}
        </div>
        
    )
}