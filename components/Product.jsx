import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';

export default function Product({ product: { name, price, slug, image } }) {
 return (
  <div>
   <Link href={`/products/${slug.current}`}>
    <div className='product-card'>
     <img
      src={urlFor(image && image[0])}
      alt='product-image'
      width={250}
      height={250}
      className='product-image'
     />
     <p className='product-name'>{name}</p>
     <p className='product-price'>$ {price}</p>
    </div>
   </Link>
  </div>
 );
}
