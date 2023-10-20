<script>
    let newProduct = {
        name:"",
        description: "",
        quantity: 0
    }
    console.log(newProduct.name.length > 0)
</script>


<div class="card">
    <form action=""
    on:submit|preventDefault={(e)=>{
        console.log("submitting form")
    }}
    >
        <label for="productName">
            <span
                    class:hide={newProduct.name.length <= 0}
            >Product Name</span>

            <input type="text" name="productName" id="productName" placeholder="Product name" bind:value={newProduct.name}>
        </label>

        <label for="productDescription">
            <span
                    class:hide={newProduct.description.length <= 0}
            >Product Description</span>

            <textarea name="productDescription"
                      id="productDescription"
                      maxlength="170"
                      placeholder="Product description"
                      bind:value={newProduct.description}></textarea>
            <span>{newProduct.description.length}/170</span>
        </label>
        <div class="row">
            <label for="price">
                <span>Price</span>
                <input type="number" name="price" id="price">
            </label>
            <label for="price">
                <span>Category</span>
                <select name="category" id="category" >
                    <option value=""></option>
                    <option value="home">Home</option>
                    <option value="Electronics">Electronics</option>
                    <option value="pharma">Pharma</option>
                    <option value="stationary">Stationary</option>
                </select>
            </label>

            <label for="stock">
                <span>Stock</span>
                <input type="number" name="stock" id="stock">
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

textarea{
    min-height:5rem;
    height: fit-content;
    padding: 0.4rem;
    resize: none;
    font-family: inherit;
    font-size: 1rem;
    font-weight: lighter;
}


.inputRow label{
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
</style>

