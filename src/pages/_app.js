import Head from "next/head";
import { ThemeProvider } from "next-themes";

import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/Layout";
import "@/styles/main.css";
import siteMetadata from "../../siteMetadata";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.defaultTheme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <NextNProgress options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
