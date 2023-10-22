<script>
    import filterByQuantity from "../lib/functions/filterByQuantity.js";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

</script>

<div class="filter">
    <button on:click={()=>{ dispatch("reloadData")}}>All</button>
    <button on:click={()=>{
                           dispatch("filter", "In Stock")
                        }}>In Stock</button>
    <button
            on:click={()=>{
                               dispatch("filter","Out Of Stock")
                            }}
    >Out Of Stock</button>
</div>


<style>
    .filter button{
        border: none;
        padding: 8px 10px;
        border-radius: 3px;
    }
</style>