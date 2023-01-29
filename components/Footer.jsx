import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

export default function Footer() {
 return (
  <div className='footer-container'>
   <p>&copy;2023 All rights reserved</p>
   <div className='socials'>
    <p className='icons'>
     <AiFillInstagram size={25} />
     <AiOutlineTwitter size={25} />
    </p>
   </div>
  </div>
 );
}
