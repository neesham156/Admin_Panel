import "../../styles/globals.css";
import type { AppProps } from "next/app";

import React, { useEffect } from "react";
import Head from "next/head";
import AdminLaytout from "../layouts/Admin";
import { ChakraProvider } from "@chakra-ui/react";

import { useRouter } from "next/router";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  const routers = useRouter();

 {
    return (
    
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Task-2</title>
          </Head>
          {/* admin layout */}
          <ChakraProvider>
            <AdminLaytout>
              <Component {...pageProps} />
            </AdminLaytout>
          </ChakraProvider>
          {/* admin layout */}
        </React.Fragment>
   
    );
  }
  // if (router.pathname.includes("/auth")) {

}
// }

export default MyApp;
