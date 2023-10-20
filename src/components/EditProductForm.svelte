<script>

    export let item;
    export let ProductData = {
        name: 'my name',
        description:"this is the product date",
        price: 30,
        quantity: 2,
        category: "kd"
    }

    console.log(item)
</script>

<div class="card">
    <form action=""
          on:submit|preventDefault={(e)=>{
        console.log("updating product form")
    }}
    >
        <label for="productName">
            <span>Product Name</span>
            <input type="text" name="productName" id="productName" placeholder="Product name" bind:value={ProductData.name}>
        </label>

        <label for="productDescription">
            <span>Product Description</span>

            <textarea name="productDescription"
                      id="productDescription"
                      maxlength="170"
                      placeholder="Product description"
                      bind:value={ProductData.description}></textarea>
            <span>{ProductData.description.length}/170</span>
        </label>
        <div class="row">
            <label for="price">
                <span>Price</span>
                <input type="number" name="price" id="price" bind:value={ProductData.price}>
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
                <input type="number" name="stock" id="stock" bind:value={ProductData.quantity}>
            </label>
        </div>
        <button type="submit">Save</button>
    </form>

</div>

<style>
    .card{
        width: 30rem;
        flex-grow: 1;
        background: white;
    }
    label{
        display: flex;
        flex-direction: column;
        /*border: green solid 1px;*/
        margin: 0.4rem 0;
        gap: 4px;
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

    @media screen and (max-width: 550px) {
        .card{
          width: 100%;
        }
    }
</style>









