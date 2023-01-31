import React, { useState, useContext } from 'react';
import { Layout, Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import { BsStarHalf, BsStarFill, BsStar } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import ProductContext from '../../context/ProductContext';

export default function ProductDeatils({ product, products }) {
 const { buy, addToCart, decQty, incQty, qty, setShowCart } =
  useContext(ProductContext);
 const [index, setIndex] = useState(0);
 const { name, details, price, image } = product;

 const handleBuyNow = () => {
  addToCart(product, qty);
  setShowCart(true);
 };

 return (
  <Layout>
   <div className='product-detail-container'>
    <div className='leftSide'>
     <img
      src={urlFor(image && image[index])}
      alt='product-image'
      width='100%'
      className='product-image'
     />
     {/* image carousel */}
     <div className='carousel-container'>
      {image?.map((item, idx) => (
       <img
        key={item._key}
        src={urlFor(item.asset._ref)}
        alt='product-image'
        className={index === idx ? 'small-image selected-image' : 'small-image'}
        onMouseEnter={() => setIndex(idx)}
       />
      ))}
     </div>
    </div>
    <div className='rightSide'>
     <h1>{name}</h1>

     <div className='reviews'>
      <BsStarFill size={14} color='red' />
      <BsStarFill size={14} />
      <BsStarFill size={14} />
      <p>&nbsp; (20)</p>
     </div>

     <div className='details'>
      <h4>Details:</h4>
      <p>{details}</p>
     </div>

     <h3>$ {price}</h3>

     <div className='quantity'>
      <h4>Quantity:</h4>
      <div className='quantity-desc'>
       <span className='minus' onClick={decQty}>
        <AiOutlineMinus />
       </span>
       <span className='num'>{qty}</span>
       <span className='plus' onClick={incQty}>
        <AiOutlinePlus />
       </span>
      </div>
     </div>

     <div className='buttons'>
      <button
       type='button'
       className='add-to-cart'
       onClick={() => addToCart(product, qty)}
      >
       Add to cart
      </button>
      <button type='button' className='buy-now' onClick={handleBuyNow}>
       Buy now
      </button>
     </div>
    </div>
   </div>

   {/* Maylike section */}
   <div className='maylike-products-wrapper'>
    <h2>You may also like</h2>
    <div className='marquee'>
     <div className='maylike-products-container track'>
      {products.map((item) => (
       <Product product={item} key={item._id} />
      ))}
     </div>
    </div>
   </div>
  </Layout>
 );
}

export const getStaticPaths = async () => {
 const query = `*[_type == "product"] {
  slug {
    current
  }
}`;
 const products = await client.fetch(query);

 const paths = products.map((product) => ({
  params: {
   slug: product.slug.current,
  },
 }));

 return {
  paths,
  fallback: 'blocking',
 };
};

export const getStaticProps = async ({ params: { slug } }) => {
 const product = await client.fetch(
  `*[_type == "product" && slug.current == '${slug}'][0]`
 );

 const products = await client.fetch(`*[_type == "product"]`);

 return {
  props: {
   product,
   products,
  },
 };
};
