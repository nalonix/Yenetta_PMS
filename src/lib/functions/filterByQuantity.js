import categorize from "./categorize.js";

export default function filterByQuantity(productsList, mode){
    let filtered;
    if(mode === "In Stock"){
        filtered = productsList.filter(ele=>{
            if(ele.quantity > 0){
                return ele
            }
        });
    }else if(mode === "Out Of Stock"){
        filtered = productsList.filter(ele=>{
            if(ele.quantity === 0){
                return ele
            }
        });
    }

    return categorize(filtered);
}

