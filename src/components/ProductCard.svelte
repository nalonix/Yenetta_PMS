<script>
    import {createEventDispatcher} from "svelte";
    import {getProductById, deleteProductById} from "../lib/firebase/firebaseUtils.js";

    let dispatch = createEventDispatcher();
    export let item;
    let product = {
        id:"Dummy Data",
        price: 20.45,
        quantity: 12,
        lastUpdate: Date.now()
    }

    async function handleDelete(){
        await deleteProductById(item.id);
        dispatch("reloadData");
    }

    async function handleEdit(){
        let productDetails = await getProductById(item.id);
        dispatch("editProduct",{productDetails});
    }

</script>

    <div class="card">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <div class="row">
        <span>
            <b>Quantity:</b> {item.quantity}
        </span>
            <span>
                <b>Price:</b> ${item.price}
        </span>
        </div>
        <footer>
            <div>
                Last Updated: {item.lastUpdate || 0}
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