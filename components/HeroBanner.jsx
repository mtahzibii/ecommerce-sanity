import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import Image from 'next/image';

export default function HeroBanner({ heroBanner }) {
 return (
  <div className='hero-banner-container'>
   <div>
    <p className='beats-solo'>{heroBanner.smallText}</p>
    <h3>{heroBanner.midText}</h3>
    <h1>{heroBanner.largeText1}</h1>
    <img
     width={400}
     height={350}
     src={urlFor(heroBanner.image)}
     alt='headphones'
     className='hero-banner-image'
    />

    <div>
     <Link href={`/products/${heroBanner.product}`}>
      <button type='button'>{heroBanner.buttonText}</button>
     </Link>
    </div>

    <div className='desc'>
     <h5>Description</h5>
     <p>{heroBanner.desc}</p>
    </div>
   </div>
  </div>
 );
}
