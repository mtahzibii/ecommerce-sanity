import React, { useContext } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import ProductContext from '../context/ProductContext';

import Link from 'next/link';

export default function Navbar() {
 const { qty } = useContext(ProductContext);
 return (
  <div className='navbar-container'>
   <p>
    <Link href='/' className=''>
     Headphones Market
    </Link>
   </p>
   <button type='button' className='cart-icon'>
    {<AiOutlineShopping />}
    <span className='cart-item-qty'>{qty}</span>
   </button>
  </div>
 );
}
