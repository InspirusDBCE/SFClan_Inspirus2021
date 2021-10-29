import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { AuthProvider } from "../contexts/auth";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
