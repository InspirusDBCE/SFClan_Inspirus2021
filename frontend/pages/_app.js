import {ChakraProvider} from "@chakra-ui/react";
import {AnimatePresence} from "framer-motion";
import Head from "next/head";
import {AuthProvider} from "../contexts/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Bus Tracker" />
          <title>App Name</title>

          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/icon-72x72.png"
            rel="icon"
            type="image/png"
            sizes="72x72"
          />
          <link
            href="/icons/icon-96x96.png"
            rel="icon"
            type="image/png"
            sizes="96x96"
          />

          <meta name="theme-color" content="#4299e1" />
        </Head>
        <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
