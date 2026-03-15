import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>AMINO DOCK</title>
        <meta name="description" content="Made for clean and premium nutrition" />
        <meta property="og:title" content="AMINO DOCK" />
        <meta property="og:description" content="Made for clean and premium nutrition" />
        <meta property="og:image" content="/logo-full.svg" />
        <link rel="icon" href="/logo-icon.svg" />
      </Head>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
