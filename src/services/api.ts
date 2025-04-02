// src/services/api.ts
import { Product, ProductsResponse } from '../types/products';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1-Nbx1QfBYyyrlq6a9qm8n-A2-dgqrIA",
    authDomain: "e-store-a01642991.firebaseapp.com",
    projectId: "e-store-a01642991",
    storageBucket: "e-store-a01642991.firebasestorage.app",
    messagingSenderId: "463696401382",
    appId: "1:463696401382:web:9a260677fc2741c52cfc27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generate 10 products for simulation
const products = [
    {
        title: "Wireless Mouse",
        description: "Ergonomic wireless mouse with long battery life.",
        price: 25.99,
        category: "Electronics",
        image: "https://www.keychron.mx/cdn/shop/files/Lemokey-G1-wireless-mouse-black.jpg?v=1724653193",
        stock: 50,
        rating: 4.5,
        createdAt: new Date()
    } as Product,
    {
        title: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches.",
        price: 79.99,
        category: "Electronics",
        image: "https://media.wired.com/photos/65b0438c22aa647640de5c75/master/w_2560%2Cc_limit/Mechanical-Keyboard-Guide-Gear-GettyImages-1313504623.jpg",
        stock: 30,
        rating: 4.7,
        createdAt: new Date()
    }as Product,
    {
        title: "Gaming Headset",
        description: "Surround sound gaming headset with noise cancellation.",
        price: 49.99,
        category: "Accessories",
        image: "https://assets2.razerzone.com/images/pnx.assets/57c2af30b5d9a2b699b3e896b788e00f/headset-landingpg-500x500-blacksharkv2pro2023.jpg",
        stock: 20,
        rating: 4.6,
        createdAt: new Date()
    }as Product,
    {
        title: "Smartphone Stand",
        description: "Adjustable smartphone stand for desk use.",
        price: 15.99,
        category: "Accessories",
        image: "https://www.apps2car.com/cdn/shop/products/tripod-phone-stand.jpg?v=1652323294",
        stock: 100,
        rating: 4.3,
        createdAt: new Date()
    }as Product,
    {
        title: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with deep bass.",
        price: 39.99,
        category: "Audio",
        image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9481.jpg?auto=webp&quality=75&width=1024",
        stock: 25,
        rating: 4.8,
        createdAt: new Date()
    }as Product,
    {
        title: "USB-C Hub",
        description: "5-in-1 USB-C hub with HDMI and SD card reader.",
        price: 29.99,
        category: "Electronics",
        image: "https://m.media-amazon.com/images/I/61Bm+9UTP6L._AC_UF1000,1000_QL80_.jpg",
        stock: 40,
        rating: 4.5,
        createdAt: new Date()
    }as Product,
    {
        title: "Laptop Stand",
        description: "Aluminum laptop stand for better ergonomics.",
        price: 34.99,
        category: "Office",
        image: "https://m.media-amazon.com/images/I/71xlXzGX9aL._AC_SL1500_.jpg",
        stock: 60,
        rating: 4.7,
        createdAt: new Date()
    }as Product,
    {
        title: "Wireless Charger",
        description: "Fast wireless charger for Qi-compatible devices.",
        price: 19.99,
        category: "Accessories",
        image: "https://www.ikea.com/mx/en/images/products/livboj-wireless-charger-white__0721950_pe733427_s5.jpg?f=s",
        stock: 35,
        rating: 4.6,
        createdAt: new Date()
    }as Product,
    {
        title: "Noise Cancelling Earbuds",
        description: "Wireless earbuds with active noise cancellation.",
        price: 89.99,
        category: "Audio",
        image: "https://cdn.thewirecutter.com/wp-content/media/2023/09/noise-cancelling-headphone-2048px-0872.jpg",
        stock: 15,
        rating: 4.9,
        createdAt: new Date()
    }as Product,
    {
        title: "4K Monitor",
        description: "27-inch 4K UHD monitor with HDR support.",
        price: 299.99,
        category: "Electronics",
        image: "https://assets-prd.ignimgs.com/2024/10/08/alienware-aw3225qf-1718732594021-1728418469322.jpg",
        stock: 10,
        rating: 4.8,
        createdAt: new Date()
    }as Product
];



/*
// Generate 100 dummy products for simulation
const generateMockProducts = (): Product[] => {
    const categories = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'];
    const brands = ['Apple', 'Samsung', 'Nike', 'Sony', 'Adidas', 'Dell', 'LG'];

    return Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
        rating: Math.floor(Math.random() * 3) + 2, // 2-5 stars
        image: `https://picsum.photos/300/300?random=${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        brand: brands[Math.floor(Math.random() * brands.length)],
        description: `This is a detailed description for Product ${i + 1}. It includes all relevant features and specifications.`,
        stock: Math.floor(Math.random() * 100)
    }));
};
*/

let allProducts : Product[];

export const getProducts = async (source: string): Promise<Product[]> => {
    try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        if(snapshot.size == 0 && source == 'home'){
            try {
                for (const product of products) {
                    await addDoc(collection(db, "products"), product);
                    console.log(`Added: ${product.title}`);
                }
                console.log("All products added successfully.");
                return products;
            } catch (error) {
                console.error("Error adding products: ", error);
            }
        }
        return snapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        })) as Product[];
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};



export const fetchProducts = async (params: {
    page: number;
    perPage?: number;
    category?: string;
    query?: string;
    source: string;
}): Promise<ProductsResponse> => {
    const perPage = params.perPage || 20;
    const startIndex = (params.page - 1) * perPage;
    /*// Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));*/
    // Filter products by category if specified
    allProducts = await getProducts(params.source);
    let filteredProducts = [...allProducts];
    if (params.category) {
        filteredProducts = filteredProducts.filter(
            p => p.category.toLowerCase() === params.category?.toLowerCase()
        );
    }
    // Filter by search query if specified
    if (params.query) {
        const query = params.query.toLowerCase();
        filteredProducts = filteredProducts.filter(
            p => p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
        );
    }
    // Calculate pagination
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + perPage
    );
    return {
        data: paginatedProducts,
        totalPages,
        currentPage: params.page
    };
};

// Utility function for single product fetch
export const fetchProductById = async (id: number): Promise<Product | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return allProducts.find(p => p.id === id);
};

