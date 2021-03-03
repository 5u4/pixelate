import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
