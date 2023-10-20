
import {doc,collection, getDoc, setDoc, updateDoc, addDoc} from 'firebase/firestore'
import {auth, db} from './firebase.js'

import {v4 as uuid} from "uuid";


// async function saveProduct(newProduct={
//     id: uuid(),
//     name: "Packard PC",
//     quantity: 5
// }) {
//     try {
//         const userRef = doc(db, 'users', "cK1eAjOWhWF2f90OApTU");
//
//         // current data
//         const userSnapshot = await getDoc(userRef);
//         if (userSnapshot.exists()) {
//             const userData = userSnapshot.data();
//
//             // update 'products' array
//             if (!userData.products) {
//                 userData.products = []; // Initialize the array if it doesn't exist
//             }
//             userData.products.push(newProduct);
//
//             // Update the document with the modified data
//             await updateDoc(userRef, userData);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

async function saveProduct(newProduct = {
    name: "Product name",
    description: "this is a description of the product",
    lastUpdate: Date.now(),
    price: 0.0,
    type: "none",
    quantity: 0
}) {
    try {
        const userRef = doc(db, 'users', "cK1eAjOWhWF2f90OApTU");

        // Create a reference to the 'products' subcollection
        const productsCollectionRef = collection(userRef, 'products');

        // Add the new product as a document within the 'products' subcollection
        await addDoc(productsCollectionRef, newProduct);
    } catch (e) {
        console.error("Error adding product:", e);
    }
}


async function updateProduct(docId,updatedData) {
    try {
        const userRef = doc(db, 'users', "cK1eAjOWhWF2f90OApTU"); // user document reference
        const productsCollectionRef = collection(userRef, 'products'); //sub collection reference
        const toUpdateRef = doc(productsCollectionRef, docId); // prodcut reference

        await setDoc(toUpdateRef,updatedData); // add new product to sub collection
    } catch (e) {
        console.error("Error updating product:", e);
    }
}


async function getProducts() {
    // TODO: update so that it fetches all the docs in products sub-collection
    try {
        const userRef = doc(db, 'users', "cK1eAjOWhWF2f90OApTU");

        // current data
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            // update 'products' array
            if (!userData.products) {
                userData.products = []; // Initialize the array if it doesn't exist
            }
            return userData.products;
        }
    } catch (e) {
        console.log(e);
    }
}

async function getProductById(productId){

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
    getProducts
}

