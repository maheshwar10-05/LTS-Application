import React, { createContext, useState, useEffect, useContext } from 'react';
import { cartService } from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState({ items: [], total: 0 });

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [], total: 0 });
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const response = await cartService.get();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart', error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }
        try {
            await cartService.add(productId, quantity);
            await fetchCart();
            alert('Item added to cart!');
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await cartService.remove(itemId);
            await fetchCart();
        } catch (error) {
            console.error('Error removing item', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
