<script>
    import {createEventDispatcher} from "svelte";

    let dispatch = createEventDispatcher();
    export let item;
    let product = {
        id:"ldkjsldk9409",
        price: 20.45,
        quantity: 12,
        lastUpdate: Date.now()
    }

    async function handleDelete(){
        console.log("Handling delete")
    }

    async function handleEdit(){
        dispatch("editProduct",{productId: product.id});
    }


</script>

    <div class="card">
        <h2>Product name</h2>
        <p>The height CSS property specifies the height of an element. By default,
            the property defines the height of. By default, the property defines the height of.
        </p>
        <div class="row">
        <span>
            <b>Quantity:</b>{product.quantity}
        </span>
            <span>
                <b>Price: </b> ${product.price}
        </span>
        </div>
        <footer>
            <div>
                Last Updated: {product.lastUpdate}
            </div>
            <div>
                <i
                        class="fa-regular fa-pen-to-square"
                        on:click={handleEdit}
                ></i>
                <i class="fa-solid fa-trash"
                    on:click={handleDelete}
                ></i>
            </div>
        </footer>
    </div>




<style>
    .card{
        margin: 0.4rem 0;
    }
    .row{
        justify-content: space-around;
        border-bottom: 1px dashed gray;
        padding-bottom: 0.7rem;
    }
    footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    i{
        padding: 0.2rem;
        cursor: pointer;
    }

</style>