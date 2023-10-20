<div class="filter">
    <button on:click={()=>{
                            console.log("All")
                        }}>All</button>
    <button on:click={()=>{
                            console.log("In stock")
                        }}>In Stock</button>
    <button
            on:click={()=>{
                                console.log("Out of stock")
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