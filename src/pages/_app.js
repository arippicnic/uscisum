import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

import Layout from "@/components/Layout";

import "@/styles/main.css";

function MyApp({ Component, pageProps }) {
  const [isTheme, setTheme] = useState();
  useEffect(() => {
    const initialTheme = localStorage.getItem("theme");
    setTheme(initialTheme);
  });

  return (
    <ThemeProvider attribute="class" defaultTheme={isTheme ? isTheme : "light"}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
