import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 const [showCart, setShowCart] = useState(false);
 const [totalPrice, setTotalPrice] = useState(0);
 const [cartItems, setCartItems] = useState([]);
 const [totalQuantities, setTotalQuantities] = useState();
 const [qty, setQty] = useState(1);

 //  Add to Cart
 const addToCart = (product, quantity) => {
  setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

  const checkProductInCart = cartItems.find((item) => item._id === product._id);

  if (checkProductInCart) {
   const updatedCartItems = cartItems.map((cartItem) => {
    if (cartItem._id === product._id)
     return { ...cartItem, quantity: cartItem.quantity + quantity };
   });

   setCartItems(updatedCartItems);
  } else {
   product.quantity = quantity;
   setCartItems([...cartItems, { ...product }]);
  }
  console.log(cartItems);
  toast.success(`${qty} ${product.name} added to cart.`);
 };

 //  Increase Quantity
 const incQty = () => {
  setQty((prev) => prev + 1);
 };

 //  Decrease Quantity
 const decQty = () => {
  setQty((prev) => {
   if (prev - 1 < 1) return 1;

   return prev - 1;
  });
 };

 //  Buy
 const buy = () => {
  console.log('nothing');
 };

 return (
  <ProductContext.Provider
   value={{
    showCart,
    totalPrice,
    cartItems,
    totalQuantities,
    qty,
    incQty,
    decQty,
    addToCart,
    buy,
   }}
  >
   {children}
  </ProductContext.Provider>
 );
};

export default ProductContext;
