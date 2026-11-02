'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addToCart, getCart, getCartCount, getCartSubtotal, openCart, removeFromCart, subscribeCart, subscribeCartOpen, updateCartQuantity } from '@/lib/cart';
import { cartAddedToast } from '@/lib/cart-toast';

const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setItems(getCart()); setHydrated(true);
    return subscribeCart(() => setItems(getCart()));
  }, []);
  useEffect(() => subscribeCartOpen(() => setOpen(true)), []);
  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const addItem = useCallback((product, qty = 1, variant = null) => {
    const success = addToCart(product, qty, variant);
    if (success) {
      const image = product.image || '';
      cartAddedToast({ name: product.name, image, price: Number(variant?.price ?? product.price), quantity: qty, variant: variant?.label || variant?.size || '' });
    }
    return success;
  }, []);
  const value = useMemo(() => ({items, hydrated, isOpen, openDrawer, closeDrawer, addItem,
    updateQuantity: updateCartQuantity, removeItem: removeFromCart, subtotal: getCartSubtotal(items), count: getCartCount(items)}), [items, hydrated, isOpen, addItem, openDrawer, closeDrawer]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be called inside CartProvider');
  return cart;
}
