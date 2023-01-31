import React from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import ProductContext from '../context/ProductContext';
import { runFireWorks } from '../lib/utils';

export default function success() {
 const { setTotalPrice, setTotalQuantities, setCartItems } =
  useContext(ProductContext);

 useEffect(() => {
  localStorage.clear();
  setCartItems([]);
  setTotalPrice(0);
  setTotalQuantities(0);
  runFireWorks();
 }, []);

 return (
  <div className='success-wrapper'>
   <div className='success'>
    <p>
     <BsBagCheckFill className='icon' />
    </p>
    <h3>Thank you for your order!</h3>
    <p className='email-msg'>Check your email inbox for the receipt.</p>

    <p className='description'>
     If you have any questions, please email
     <a className='email' href='mailto:order@example.com'>
      order@example.com
     </a>
    </p>

    <Link href='/'>
     <button type='button' className='btn-continue-shopping'>
      Continue Shopping
     </button>
    </Link>
   </div>
  </div>
 );
}
