import '../styles/globals.css';
import { ProductProvider } from '../context/ProductContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
 return (
  <ProductProvider>
   <Toaster />
   <Component {...pageProps} />
  </ProductProvider>
 );
}
