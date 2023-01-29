import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';

import Link from 'next/link';

export default function Navbar() {
 return (
  <div className='navbar-container'>
   <p>
    <Link href='/' className=''>
     Headphones Market
    </Link>
   </p>
   <button type='button' onClick='' className='cart-icon'>
    {<AiOutlineShopping />}
    <span className='cart-item-qty'>1</span>
   </button>
  </div>
 );
}
