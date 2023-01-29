import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
 return (
  <div className='layout'>
   <Head>
    <title>e-Commerce Application</title>
    <meta name='description' content='e-commerce' />
    <meta name='keywords' content='e-commerce, sanity' />
   </Head>
   <header>
    <Navbar />
   </header>
   <main className='main-container'>{children}</main>
   <footer>
    <Footer />
   </footer>
  </div>
 );
}
