import React from 'react';
import { client } from '../lib/client';
import {
 Footer,
 HeroBanner,
 FooterBanner,
 Cart,
 Product,
 Layout,
 Navbar,
} from '../components/index';

export default function Home({ bannerData, products }) {
 return (
  <>
   <Layout>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <div className='products-heading'>
     <h2>Best selling products</h2>
     <p>Speakers of many variations</p>
     <div className='products-container'>
      {products.map((product) => (
       <Product key={product._id} product={product} />
      ))}
     </div>
     <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
   </Layout>
  </>
 );
}

export const getServerSideProps = async () => {
 const productQuery = '*[_type == "product"]';
 const products = await client.fetch(productQuery);

 //  Fetch banner
 const bannerQuery = '*[_type == "banner"]';
 const bannerData = await client.fetch(bannerQuery);

 return {
  props: {
   products,
   bannerData,
  },
 };
};
