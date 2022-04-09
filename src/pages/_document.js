import { Html, Head, Main, NextScript } from "next/document";
import siteMetadata from "siteMetadata";

export default function Document() {
  return (
    <Html lang={siteMetadata.language} itemScope="itemscope" itemType="http://schema.org/WebPage">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
