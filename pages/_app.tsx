import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import { Footer } from "../components/Footer";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Head>
          <title>Image Pixelater</title>
        </Head>
        <Component {...pageProps} />
        <Footer />
      </RecoilRoot>
    </ChakraProvider>
  );
};

export default App;
