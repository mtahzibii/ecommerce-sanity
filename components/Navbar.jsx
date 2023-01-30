import React, { useContext } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import ProductContext from '../context/ProductContext';
import Cart from './Cart';

import Link from 'next/link';

export default function Navbar() {
 const { totalQuantities, showCart, setShowCart } = useContext(ProductContext);
 return (
  <div className='navbar-container'>
   <p>
    <Link href='/' className=''>
     Headphones Market
    </Link>
   </p>

   {!showCart && (
    <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
     {<AiOutlineShopping />}
     <span className='cart-item-qty'>{totalQuantities}</span>
    </button>
   )}

   {showCart && <Cart />}
  </div>
 );
}
