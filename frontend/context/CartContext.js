import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('aminoDockCart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aminoDockCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item._id === product._id && item.size === product.size && item.flavour === product.flavour
      );

      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, qty: item.qty + qty } : item
        );
      }

      return [...current, { ...product, qty }];
    });
  };

  const removeFromCart = (index) => {
    setItems((current) => current.filter((_, i) => i !== index));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
