import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ClothingCard from "./ClothingCard";
import { Link } from 'react-router-dom';
export default function ListPage(props) {
    const [visibleClothes, setVisibleClothes] = useState([])
    function generateRange(start, end, step = 1) {
        const length = Math.floor((end - start) / step) + 1;
        return Array.from({ length }, (_, i) => start + i * step);
    }
    const {page} = useParams();
    const data = props.data;
    const end = (40 * page) - 1;
    const start = 40 * (page - 1);
    useEffect(() => {
        if(data.length > 0 && start < data.length) setVisibleClothes(generateRange(start, end < data.length ? end : data.length));
    },[props, page])
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:"flex", flexDirection:'row'}}>
                <Link to={`/products/${parseInt(page) - 1}`} style={{display: parseInt(page) > 1 ? "block" : "none"}}>Previous Page</Link>
                <Link to={`/products/${parseInt(page) + 1}`} style={{display: end < (data.length-1) ? "block" : "none", marginLeft:'auto', marginRight:'0px'}}>Next Page</Link>
            </div>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows:'repeat(10, 1fr)', gridColumnGap:'0px', gridRowGap:'0px'}}>
                {visibleClothes.map((selected) => <ClothingCard item={data[selected]} key={selected}/>)}
            </div>
            <div style={{display:"flex", flexDirection:'row'}}>
                <Link to={`/products/${parseInt(page) - 1}`} style={{display: parseInt(page) > 1 ? "block" : "none"}}>Previous Page</Link>
                <Link to={`/products/${parseInt(page) + 1}`} style={{display: end < (data.length-1) ? "block" : "none", marginLeft:'auto', marginRight:'0px'}}>Next Page</Link>
            </div>
        </div>
    )

    
}