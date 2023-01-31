import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 const [showCart, setShowCart] = useState(false);
 const [totalPrice, setTotalPrice] = useState(0);
 const [cartItems, setCartItems] = useState([]);
 const [totalQuantities, setTotalQuantities] = useState(0);
 const [qty, setQty] = useState(1);

 let foundProduct;
 let index;

 //  Toggle Cart Item Quantity
 const toggleCartItemQuanitity = (id, value) => {
  foundProduct = cartItems.find((item) => item._id === id);
  index = cartItems.findIndex((product) => product._id === id);
  const newCartItems = cartItems.filter((item) => item._id !== id);

  if (value === 'inc') {
   setCartItems([
    ...newCartItems,
    { ...foundProduct, quantity: foundProduct.quantity + 1 },
   ]);
   setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
   setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
  } else if (value === 'dec') {
   if (foundProduct.quantity > 1) {
    setCartItems([
     ...newCartItems,
     { ...foundProduct, quantity: foundProduct.quantity - 1 },
    ]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
   }
  }
 };

 //  Delete item from cart
 const removeProductFromCart = (product) => {
  const foundProduct = cartItems.find((cartItem) => cartItem._id === product._id);

  const newCartItems = cartItems.filter(
   (cartItem) => cartItem._id !== foundProduct._id
  );
  setTotalPrice(
   (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity
  );
  setCartItems(newCartItems);
  setTotalQuantities(
   (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
  );
 };

 //  Add to cart
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
    setShowCart,
    setTotalPrice,
    setTotalQuantities,
    setCartItems,
    totalPrice,
    cartItems,
    totalQuantities,
    qty,
    incQty,
    decQty,
    addToCart,
    buy,
    toggleCartItemQuanitity,
    removeProductFromCart,
   }}
  >
   {children}
  </ProductContext.Provider>
 );
};

export default ProductContext;
