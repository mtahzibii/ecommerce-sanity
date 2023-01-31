import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import getStripe from '../lib/getStripe';
import {
 AiOutlineMinus,
 AiOutlinePlus,
 AiOutlineLeft,
 AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { urlFor } from '../lib/client';
import ProductContext from '../context/ProductContext';
import Product from './Product';

export default function Cart() {
 const cartRef = useRef();
 const {
  totalQuantities,
  totalPrice,
  cartItems,
  setShowCart,
  removeProductFromCart,
  incQty,
  decQty,
  qty,
  toggleCartItemQuanitity,
 } = useContext(ProductContext);

 const handleCheckout = async () => {
  const stripe = await getStripe();

  const response = await fetch('/api/stripe', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify(cartItems),
  });

  if (response.statusCode === 500) return;

  const data = await response.json();

  toast.loading('Redirecting...');

  stripe.redirectToCheckout({ sessionId: data.id });
 };

 return (
  <div className='cart-wrapper' ref={cartRef}>
   <div className='cart-container'>
    <button
     type='button'
     className='cart-heading'
     onClick={() => setShowCart(false)}
    >
     <AiOutlineLeft />
     <span className='heading'> Your cart </span>
     <span className='cart-num-items'>({totalQuantities} items)</span>
    </button>

    {cartItems.length === 0 && (
     <div className='empty-cart'>
      <AiOutlineShopping size={150} />
      <h4>You bag is empty!</h4>
      <Link href='/'>
       <button type='button' onClick={() => setShowCart(false)}>
        Continue Shopping
       </button>
      </Link>
     </div>
    )}

    <div className='product-container'>
     {cartItems.length >= 1 &&
      cartItems.map((cartItem) => (
       <div key={cartItem._id} className='product'>
        <img
         src={urlFor(cartItem?.image[0])}
         alt='product-thumbnail'
         className='cart-product-image'
        />
        <div className='item-desc'>
         <div className='flex'>
          <strong>{cartItem.name}</strong>
          <h4>$ {cartItem.price}</h4>
         </div>
         <div className='flex'>
          <div className='quantity'>
           <div className='quantity-desc'>
            <span
             className='minus'
             onClick={() => toggleCartItemQuanitity(cartItem._id, 'dec')}
            >
             <AiOutlineMinus />
            </span>
            <span className='num'>{cartItem.quantity}</span>
            <span
             className='plus'
             onClick={() => toggleCartItemQuanitity(cartItem._id, 'inc')}
            >
             <AiOutlinePlus />
            </span>
           </div>
          </div>
          <button type='button' className='remove-item'>
           <TiDeleteOutline onClick={() => removeProductFromCart(cartItem)} />
          </button>
         </div>
        </div>
       </div>
      ))}
    </div>

    {cartItems.length >= 1 && (
     <div className='cart-bottom'>
      <div className='total'>
       <h3>Subtotal:</h3>
       <h3>${totalPrice}</h3>
      </div>

      <Link href='/' className='btn-container'>
       <button type='button' className='btn-payment' onClick={handleCheckout}>
        Pay With Stripe
       </button>
      </Link>
     </div>
    )}
   </div>
  </div>
 );
}
