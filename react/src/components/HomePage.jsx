import { useEffect, useState } from "react";
import ClothingCard from "./ClothingCard";

export default function HomePage(props) {
    const [alreadyRendered, setAlreadyRendered] = useState(false)
    const clothes = props.data
    const featured = clothes.filter((cloth)=>cloth.Rating === 5.0)
    
    const [selecteds, setSelected] = useState([])
    useEffect(() => {
        if(featured.length >= 4 && !alreadyRendered){
            let selectedClothes = []
            //console.log(featured)
            while(selectedClothes.length < 4){
                let num = Math.floor(Math.random() * featured.length);
                if(selectedClothes.indexOf(num) === -1) selectedClothes.push(num);
            };
            setAlreadyRendered(true)
            setSelected(selectedClothes)
        }
    }, [props])
    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <h2>Welcome to Cool Clothes!</h2>
            <h3>Check out our featured items!</h3>
            <div style={{display:"flex", flexDirection:"row", marginRight:'auto', marginLeft:'auto'}}>
                {selecteds?.map((selected) => <ClothingCard item={featured[selected]} key={selected}/>)}
            </div>
        </div>
    )
}