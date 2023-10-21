export default function categorize(productsList){
    let categorized = {
        home: [],
        pharma: [],
        electronics: [],
        stationary: []
    }

    productsList.forEach(ele=>{
        switch (ele.category){
            case "home":
                categorized.home.push(ele);
                break;
            case "pharma":
                categorized.pharma.push(ele);
                break;
            case "electronics":
                categorized.electronics.push(ele);
                break;
            case "stationary":
                categorized.stationary.push(ele);
                break;
        }
    })
    return categorized;
}