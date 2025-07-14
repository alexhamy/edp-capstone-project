import { useEffect, useState } from "react";
import ClothingCard from "./ClothingCard";

export default function SearchPage(props){
    const filterPredicate = (item) =>{
        let goodItem = true
        const item_string = `${item.Category} ${item.Material} ${item.Season} ${item.Type}`.toLowerCase()
        const searchArray = props.searchTerm.toLowerCase().split(" ")
        searchArray.forEach((word) => {
            if(!item_string.includes(word)){
                goodItem = false
            }
        })
        return goodItem;
    }
    const [filteredData, setFilteredData] = useState([])
    useEffect(() =>{
        if(props.data.length > 0){
            setFilteredData(props.data.filter((item) => filterPredicate(item)))
        }
    },[props])
    return(
        <div style={{display:'flex', flexDirection:'column'}}>
            <h1>Search results for search term: {props.searchTerm}</h1>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows:'repeat(1, 1fr)', gridColumnGap:'0px', gridRowGap:'0px'}}>
                {filteredData?.map((selected) => {return (<ClothingCard item={selected} key={selected.id}/>)})}
            </div>
        </div>
    )
}