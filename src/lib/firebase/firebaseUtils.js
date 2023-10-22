
import {doc,collection, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc} from 'firebase/firestore'
import {auth, db} from './firebase.js'
import products from "../../productsStore.js";
import categorize from "../functions/categorize.js";


async function saveProduct(newProduct = {
    name: "Product name",
    description: "this is a description of the product",
    lastUpdate: Date.now(),
    price: 0.0,
    type: "none",
    quantity: 0
}) {
    try {
        const userRef = doc(db, 'users', "YusjvqFDaeE4kamEpIdr");
        const productsCollectionRef = collection(userRef, 'products');
        await addDoc(productsCollectionRef, newProduct);
        products.update(async ()=>{
            let productList = await categorize(await getProducts());
            return  productList || {
                home: [],
                pharma: [],
                electronics: [],
                stationary: []
            };
        });
        products.set(async data=>{
            return "Horoscope"
        });
    } catch (e) {
        console.error("Error adding product:", e);
    }

}

async function updateProduct(docId,updatedData) {
    try {
        const userRef = doc(db, 'users', "YusjvqFDaeE4kamEpIdr"); // user document reference
        const productsCollectionRef = collection(userRef, 'products'); //sub collection reference
        const toUpdateRef = doc(productsCollectionRef, docId); // prodcut reference

        await setDoc(toUpdateRef,updatedData); // add new product to sub collection
    } catch (e) {
        console.error("Error updating product:", e);
    }
}


async function getProducts() {
    try {
        const userRef = doc(db, 'users', 'YusjvqFDaeE4kamEpIdr');

        // Reference to the 'products' sub-collection
        const productsCollectionRef = collection(userRef, 'products');

        // Query to get all documents in the 'products' sub-collection
        const querySnapshot = await getDocs(productsCollectionRef);

        // Extract the data from each document
        const products = [];

        querySnapshot.forEach((doc) => {
            products.push({id:doc.id,...doc.data()});
        });

        return products;
    } catch (e) {
        console.error(e);
    }
}
async function getProductById(productId){
    try {
        const userRef = doc(db, 'users', "YusjvqFDaeE4kamEpIdr"); // user document reference
        const productsCollectionRef = collection(userRef, 'products'); //sub collection reference
        const productToFetch = doc(productsCollectionRef, productId); // prodcut reference
        const fetched = await getDoc(productToFetch);
        return {id: fetched.id, ...fetched.data()};
    } catch (e) {
        console.error("Error updating product:", e);
    }
}


async function deleteProductById(productId){
    console.log(productId)
    try {
        const userRef = doc(db, 'users', "YusjvqFDaeE4kamEpIdr"); // user document reference
        const productsCollectionRef = collection(userRef, 'products'); //sub collection reference
        const productToDelete = doc(productsCollectionRef, productId); // prodcut reference
        await deleteDoc(productToDelete)
    } catch (e) {
        console.error("Error updating product:", e);
    }
}
// async function saveTodos(){
//     try{
//         const userRef = doc(db, 'user', $authStore.user.uid);
//         await setDoc(userRef, {
//             todos: todoList
//         },{
//             merge: true
//         })
//     }catch (e) {
//         console.log(e);
//     }
// }


export {
    saveProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProductById
}

