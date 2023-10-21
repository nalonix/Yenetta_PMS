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

import filterByName from "../lib/functions/filterByName.js";
// saveProduct();


let editingProduct = false;
let productToEdit = "";
let productsList = $products|| {
    home: [],
    pharma: [],
    electronics: [],
    stationary: []
};

$:{
 console.log(productsList)
}

onMount(async ()=>{
    productsList = categorize(await getProducts());
})

async function editProduct({detail}){
    console.log(detail)
    productToEdit = detail.productId;
    editingProduct = true;
    console.log(detail)
}

async function closeEditScreen(){
    editingProduct = false;
}
</script>

<svelte:head>
    <title>Product Manager</title>
</svelte:head>
{JSON.stringify(productsList)}
{#if editingProduct}
    <div class="overlay" on:click|self={closeEditScreen} transition:fade>
        <div class="section editproduct">
            <p class="sectionHeader">
                Edit Product
                <i class="fa-solid fa-xmark"
                on:click={closeEditScreen}></i>
            </p>
            <EditProductForm item={productToEdit} on:closeEditScreen={closeEditScreen}/>
        </div>
    </div>
{/if}

<div class="main">
        <div class="container">
            <div class="section newproduct">
                <p class="sectionHeader">
                    New Product
                </p>
                <NewProductForm/>
            </div>
        </div>
        <div class="container myproducts">
            <h1 class="containerHeader">My Prodcuts</h1>
                <div class="section">
                    <div class="searchBar">
                        <input type="text">
                        <button>Search /</button>
                    </div>
                    <CategoriesLinks />
                    <FilterButtons />
                </div>
                <div class="productList">
                    {#if productsList.home.length > 0}
                        <div class="section home" id="home">
                            <p class="sectionHeader">
                                Home
                            </p>
                            {#each productsList.home as item, idx (item)}
                                <ProductCard on:editProduct={editProduct} item={item}/>
                            {/each}
                        </div>
                        {/if}
                    {#if productsList.electronics.length > 0}
                        <div class="section electronics">
                            <p class="sectionHeader">
                                Electronics
                            </p>
                            {#each productsList.electronics as item, idx (item)}
                                <ProductCard on:editProduct={editProduct} item={item}/>
                            {/each}
                        </div>
                    {/if}
                    {#if productsList.pharma.length > 0}
                    <div class="section pharma">
                        <p class="sectionHeader">
                            Pharma
                        </p>
                        {#each productsList.pharma as item, idx (item)}
                            <ProductCard on:editProduct={editProduct} item={item}/>
                        {/each}
                    </div>
                        {/if}
                    {#if productsList.stationary.length > 0}
                    <div class="section stationary">
                        <p class="sectionHeader">
                            Stationary
                        </p>
                        {#each productsList.stationary as item, idx (item)}
                            <ProductCard on:editProduct={editProduct} item={item}/>
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
        border-left: var(--french-rose) 3px solid;
        border-right: var(--french-rose) 3px solid;

        height: 100vh;
        width: 80%;
        margin: 0 auto;

    }
    .container{
        width: 50%;
        border: solid brown 2px;
        display: flex;
        flex-direction: column;
    }


    .productList{
        flex-grow: 1;
        overflow: scroll;
        width: 100%;
        border: green 2px dashed;
    }


    .searchBar{
        background: white;
        display: flex;
        gap: 0.7rem;
        padding: 0.2rem;
        border-radius: 3px;

    }
    .searchBar input{
        flex-grow: 1;
        border: none;
        outline: none;
    }
    .searchBar button{
        border: none;
        border-radius: 3px;
        padding: 0.4rem 0.8rem;
    }


    .searchBar button:active{
        background: pink;
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
            border: solid blue 4px;
            width: 85%;
            flex-direction: column;
        }
        .container{
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