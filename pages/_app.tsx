import { FC } from "react";

import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@/themes";

import "../styles/globals.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";
import Head from "next/head";

const MyApp: FC<{ Component: FC; pageProps: any }> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=places&libraries=drawing"
          async
          defer
        ></script>
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
