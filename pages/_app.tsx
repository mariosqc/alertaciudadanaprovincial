import { FC, useEffect } from "react";
import firebase from "firebase/compat/app";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@/themes";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

import "../styles/globals.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";
import Head from "next/head";
import { firebaseOptions } from "@/firebase";
import { ContextProviders } from "@/contexts";

const MyApp: FC<{ Component: FC; pageProps: any }> = ({ Component, pageProps }) => {
  useEffect(() => {
    firebase.initializeApp(firebaseOptions);
  }, []);

  useEffect(() => {
    navigator.serviceWorker.getRegistration();
  }, []);

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Head>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=places&libraries=drawing"
            async
            defer
          ></script>
        </Head>

        <ContextProviders>
          <Component {...pageProps} />
        </ContextProviders>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default MyApp;
