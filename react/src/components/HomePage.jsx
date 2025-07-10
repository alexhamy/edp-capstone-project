import ClothingCard from "./ClothingCard";

export default function HomePage(props) {
    const clothes = props.data
    const featured = clothes.filter((cloth)=>cloth.Rating === 5.0)
    const selectedClothes = []
    if(featured.length >= 4){
        while(selectedClothes.length < 4){
            let num = Math.floor(Math.random() * featured.length);
            if(selectedClothes.indexOf(num) === -1) selectedClothes.push(num);
        };
    }
    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <h2>Welcome to Cool Clothes!</h2>
            <h3>Check out our featured items!</h3>
            <div style={{display:"flex", flexDirection:"row"}}>
                {selectedClothes.map((selected) => <ClothingCard item={featured[selected]} key={selected}/>)}
            </div>
        </div>
    )
}