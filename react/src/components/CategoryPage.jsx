import { useEffect, useState } from "react";
import ClothingCard from "./ClothingCard";

export default function CategoryPage(props){
    const [materialSelection, setMaterialSelection] = useState('');
    const [typeSelection, setTypeSelection] = useState('');
    const [categorySelection, setCategorySelection] = useState('');
    const [seasonSelection, setSeasonSelection] = useState('');
    const [sizeSelection, setSizeSelection] = useState('');
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        if(materialSelection || typeSelection || categorySelection || seasonSelection || sizeSelection){
            setFilteredData(props.data.filter((item) => filterPredicate(item)))
        }        
        else{
            setFilteredData([])
        }
    }, [materialSelection, typeSelection, categorySelection, seasonSelection, sizeSelection])
    const filterPredicate = (item) => {
        if(materialSelection !== "" && item.Material !== materialSelection){
            return false
        }
        if(typeSelection !== "" && item.Type !== typeSelection){
            return false
        }
        if(categorySelection !== "" && item.Category !== categorySelection){
            return false
        }
        if(seasonSelection !== "" && item.Season !== seasonSelection){
            return false
        }
        if(sizeSelection !== "" && item.Size !== sizeSelection){
            return false
        }
        return true
    }
    const material = [
        "Cotton",
        "Polyester",
        "Wool",
        "Silk",
        "Linen",
        "Denim",
        "Leather",
        "Cashmere",
        "Nylon"]
    const type = [
        "T-Shirt",
        "Jeans",
        "Sweater",
        "Dress",
        "Jacket",
        "Skirt",
        "Shorts",
        "Blouse",
        "Hoodie",
        "Coat",
        "Tank top",
        "Cardigan",
        "Sweatpants",
        "Button-Up Shirt"
    ]
    const category =[
        "Formal",
        "Semi-Formal",
        "Casual"
    ]
    const size =[
        "S",
        "M",
        "L",
        "XL",
        "XS",
        "XXL",
        "3XL"
    ]
    const season = ["Winter", "Fall", "Summer", "Spring"]
    return (
        <div>
            <select style={{width:"15%", marginLeft:'4%'}} defaultValue={""} onChange={(event) => setMaterialSelection(event.target.value)}>
                <option value="">Choose A Material</option>
                {material.map((cat, i)=>{
                    return(
                        <option key={i} value={cat}>{cat}</option>
                    )
                })}
            </select>
            <select style={{width:"15%", marginLeft:'4%'}} defaultValue={""} onChange={(event) => setTypeSelection(event.target.value)}>
                <option value="">Choose A Type</option>
                {type.map((cat, i)=>{
                    return(
                        <option key={i} value={cat}>{cat}</option>
                    )
                })}
            </select>
            <select style={{width:"15%", marginLeft:'4%'}} defaultValue={""} onChange={(event) => setCategorySelection(event.target.value)}>
                <option value="">Choose A Category</option>
                {category.map((cat, i)=>{
                    return(
                        <option key={i} value={cat}>{cat}</option>
                    )
                })}
            </select>
            <select style={{width:"15%", marginLeft:'4%'}} defaultValue={""} onChange={(event) => setSizeSelection(event.target.value)}>
                <option value="">Choose A Size</option>
                {size.map((cat, i)=>{
                    return(
                        <option key={i} value={cat}>{cat}</option>
                    )
                })}
            </select>
            <select style={{width:"15%", marginLeft:'4%'}} defaultValue={""} onChange={(event) => setSeasonSelection(event.target.value)}>
                <option value="">Choose A Season</option>
                {season.map((cat, i)=>{
                    return(
                        <option key={i} value={cat}>{cat}</option>
                    )
                })}
            </select>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows:'repeat(1, 1fr)', gridColumnGap:'0px', gridRowGap:'0px'}}>
                {filteredData?.map((selected) => {return (<ClothingCard item={selected} key={selected.id}/>)})}
            </div>
        </div>
    )
       
}