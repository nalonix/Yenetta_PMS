<script>
import {saveProduct, getProducts} from "../lib/firebase/firebaseUtils.js"
import categorize from "../lib/functions/categorize.js";
import products from "../productsStore.js";
import {onMount} from "svelte";
import {fade} from "svelte/transition"

import NewProductForm from "../components/NewProductForm.svelte";
import ProductCard from "../components/ProductCard.svelte";
import CategoriesLinks from "../components/CategoriesLinks.svelte";
import FilterButtons from "../components/FilterButtons.svelte";
import EditProductForm from "../components/EditProductForm.svelte";
import filterByQuantity from "../lib/functions/filterByQuantity.js";

// saveProduct();


let editingProduct = false;
let productToEdit = "";

let productsList = $products || {
    home: [],
    pharma: [],
    electronics: [],
    stationary: []
};




onMount(async ()=>{
    productsList = categorize(await getProducts());
})

async function editProduct({detail}){
    productToEdit = detail.productDetails;
    editingProduct = true;
}

async function closeEditScreen(){
    editingProduct = false;
}

async function handleFilter({detail}){
    productsList = filterByQuantity(await getProducts(),detail)
}
async function handleReload(){
    productsList = categorize(await getProducts());
}
</script>

<svelte:head>
    <title>Product Manager</title>
</svelte:head>

{#if editingProduct}
    <div class="overlay" transition:fade>
        <div class="section editproduct">
            <p class="sectionHeader">
                Edit Product
                <i class="fa-solid fa-xmark"
                on:click={closeEditScreen}></i>
            </p>
            <EditProductForm ProductData={productToEdit} on:closeEditScreen={closeEditScreen}
                on:reloadData={handleReload}
            />
        </div>
    </div>
{/if}

<div class="main">
        <div class="container">
            <div class="section newproduct">
                <p class="sectionHeader">
                    New Product
                </p>
                <NewProductForm on:reloadData={handleReload}/>
            </div>
        </div>
        <div class="container myproducts">
            <h1 class="containerHeader">My Prodcuts</h1>
                <div class="section">
                    <CategoriesLinks />
                    <FilterButtons
                        on:filter={handleFilter}
                        on:reloadData={handleReload}
                    />
                </div>
                <div class="productList">
                    {#if productsList.home.length > 0}
                        <div class="section home" id="home">
                            <p class="sectionHeader">
                                Home
                            </p>
                            {#each productsList.home as item, idx (item)}
                                <ProductCard
                                        on:editProduct={editProduct}
                                        item={item}
                                        on:reloadData={handleReload}
                                />
                            {/each}
                        </div>
                        {/if}
                    {#if productsList.electronics.length > 0}
                        <div class="section electronics" id="electronics">
                            <p class="sectionHeader">
                                Electronics
                            </p>
                            {#each productsList.electronics as item, idx (item)}
                                <ProductCard
                                        on:editProduct={editProduct}
                                        item={item}
                                        on:reloadData={handleReload}
                                />
                            {/each}
                        </div>
                    {/if}
                    {#if productsList.pharma.length > 0}
                    <div class="section pharma" id="pharma">
                        <p class="sectionHeader">
                            Pharma
                        </p>
                        {#each productsList.pharma as item, idx (item)}
                            <ProductCard
                                    on:editProduct={editProduct}
                                    item={item}
                                    on:reloadData={handleReload}
                            />
                        {/each}
                    </div>
                        {/if}
                    {#if productsList.stationary.length > 0}
                    <div class="section stationary" id="stationary">
                        <p class="sectionHeader">
                            Stationary
                        </p>
                        {#each productsList.stationary as item, idx (item)}
                            <ProductCard
                                    on:editProduct={editProduct}
                                    item={item}
                                    on:reloadData={handleReload}
                            />
                        {/each}
                    </div>
                        {/if}
                </div>
        </div>

</div>


<style>
    .main{
        display: flex;
        flex-direction: row;

        height: 100vh;
        width: 80%;
        margin: 0 auto;

    }
    .container{
        width: 50%;
        border-left: solid var(--french-rose) 2px;
        border-right: solid var(--french-rose) 2px;

        display: flex;
        flex-direction: column;
    }


    .productList{
        flex-grow: 1;
        overflow: scroll;
        width: 100%;
    }

    .sectionHeader{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .sectionHeader i{
        padding: 0.2rem;
        cursor: pointer;
    }




    @media screen and (max-width: 900px) {
        .main{
            width: 90%;
        }
    }

    @media screen and (max-width: 700px){
        .main{
            width: 85%;
            flex-direction: column;
        }
        .container{
            border-right: none;
            border-left: none;
            border-top: solid var(--french-rose) 2px;
            border-bottom: solid var(--french-rose) 2px;
            height: fit-content;
            width: 100%;
        }
        .productList{
            height: fit-content;
            overflow: visible;
        }
    }

    @media screen and (max-width: 550px) {
        .main{
            width: 100%;
        }
    }
</style>