import ContextProvider from '@/contexts';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from "../components/common/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
