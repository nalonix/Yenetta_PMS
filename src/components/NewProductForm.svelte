<script>
    import products from "../productsStore.js";
    import {getProducts, saveProduct} from "../lib/firebase/firebaseUtils.js";
    import moment from 'moment';
    import categorize from "../lib/functions/categorize.js";
    import {createEventDispatcher} from "svelte";



    let dispatch = createEventDispatcher();

    const now = moment();
    const formattedDate = now.format('YYYY-MM-DD');

    let newProduct = {
        name:"",
        description: "",
        quantity: 0,
        price:0,
        category: "",
        lastUpdate: formattedDate
    }

</script>

<div class="card">
    <form action=""
    on:submit|preventDefault={async (e)=>{
        if(newProduct.name !== "" && newProduct.description !== "" && newProduct.quantity !== 0 && newProduct.price !== 0 && newProduct.category !== ""){
            await saveProduct(newProduct);
            newProduct = {
        name:"",
        description: "",
        quantity: 0,
        price:0,
        category: "",
        lastUpdate: formattedDate
    }
            dispatch("reloadData");
        }else{
            alert("Can't leave a blank input field!")
        }

    }}
    >
        <label for="productName">
            <span>Product Name</span>
            <input type="text" name="productName" id="productName" bind:value={newProduct.name}>
        </label>

        <label for="productDescription">
            <span>Product Description</span>

            <textarea name="productDescription"
                      id="productDescription"
                      maxlength="170"
                      bind:value={newProduct.description}></textarea>
            <span>{newProduct.description.length}/170</span>
        </label>
        <div class="row">
            <label for="price">
                <span>Price</span>
                <input type="number" name="price" id="price" bind:value={newProduct.price}>
            </label>
            <label for="price">
                <span>Category</span>
                <select name="category" id="category" bind:value={newProduct.category} >
                    <option value=""></option>
                    <option value="home">Home</option>
                    <option value="electronics">Electronics</option>
                    <option value="pharma">Pharma</option>
                    <option value="stationary">Stationary</option>
                </select>
            </label>

            <label for="quantity">
                <span>Quantity</span>
                <input type="number" name="quantity" id="quantity" bind:value={newProduct.quantity}>
            </label>
        </div>
        <button type="submit">Save</button>
    </form>
</div>


<style>
label{
    display: flex;
    flex-direction: column;
    /*border: green solid 1px;*/
    margin: 0.4rem 0;
    gap: 4px;
}
.hide{
    opacity: 0%;
}

span{
    opacity: 100%;
    transition-duration: 1s;
}




.row label{
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    align-items: center;

}


select{
    padding: 0.2rem;
}
button[type="submit"]{
    align-self: end;
}

@media screen and (max-width: 1200px) {
    .row{
        flex-direction: column;
    }
}

</style>

