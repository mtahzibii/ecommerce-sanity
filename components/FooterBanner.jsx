import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

export default function FooterBanner({
 footerBanner: {
  largeText1,
  largeText2,
  discount,
  saleTime,
  smallText,
  midText,
  desc,
  product,
  buttonText,
  image,
 },
}) {
 return (
  <div className='footer-banner-container'>
   <div className='banner-desc'>
    <div className='left'>
     <p>{discount}</p>
     <h3 className=''>{largeText1}</h3>
     <h3 className=''>{largeText2}</h3>
     <p>{saleTime}</p>
    </div>
    <div className='right'>
     <p>{smallText}</p>
     <h3>{midText}</h3>
     <p>{desc}</p>
     <Link href={`/products/${product}`}>
      <button type='button'>{buttonText}</button>
     </Link>
    </div>

    <img src={urlFor(image)} alt='product-image' className='footer-banner-image' />
   </div>
  </div>
 );
}
