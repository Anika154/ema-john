import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../../../utilities/fakedb';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        console.log('product API called');
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                console.log('Product Received');
            }
            );

    }, []);

    useEffect(() => {
        console.log('Local Storage cart called');
        if (products.length) {
            const savedCart = getStoredCart();
            const storeCart = [];
            for (const key in savedCart) {
                // console.log(products);
                console.log(key, savedCart[key]);
                const addedProduct = products.find(product => product.key
                    === key);
                // console.log(key, addedproduct);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    // console.log(addedProduct);
                    storeCart.push(addedProduct);
                }
            }
            setCart(storeCart);
        }

    }, [products]);


    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);//save to local storage
    }


    return (
        <div className="shop-container">
            <div className="product-container">
                <h3>Products:{products.length}</h3>
                {
                    products.map(product => <Product
                        key={product.key}
                        product={product}

                        handleAddToCart={handleAddToCart}
                    >
                    </Product>)
                }
            </div>
            <div className="cart-conatiner">
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;