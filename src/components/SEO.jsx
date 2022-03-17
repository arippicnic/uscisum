import React from "react";
import Head from "next/head";
import siteMetadata from "siteMetadata";

const { description, name, themeColor, author, authorUrl, siteUrl } =
  siteMetadata;

const RenderContent = ({ content }) => (
  <Head>
    <meta name="content_id" content={content._id} />
    <meta name="content_PublishedDate" content={content.createdAt} />
    <meta name="content_ModifiedDate" content={content.updatedAt} />
  </Head>
);
const RenderAuthor = ({ author }) => (
  <Head>
    <title>{author}</title>
    <link rel="shortcut icon" href="/icons/favicon.ico" />
  </Head>
);
const RenderArticel = ({ url, finalTitle }) => (
  <Head>
    <title>{finalTitle}</title>
    <meta content={finalTitle} property="og:title" />
    <meta content={finalTitle} property="twitter:title" />
    <meta content={description} name="description" />
    <meta content={description} property="og:description" />
    <meta content={description} property="twitter:description" />
    <meta content={"image/jpeg"} property="og:image:type" />
    <meta content="summary_large_image" name="twitter:card" />
    <meta content="website" property="og:type" />
    <meta content={name} property="og:site_name" />
    <meta content={url ? url : siteUrl} property="og:url" />
    <meta name="content_author" content={author} />
    <meta name="content_author_site" content={authorUrl} />

    <link rel="shortcut icon" href="/icons/favicon.ico" />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/icons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/icons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/icons/favicon-16x16.png"
    />
    <link rel="manifest" href="/icons/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/icons/safari-pinned-tab.svg"
      color={themeColor}
    />

    <meta name="msapplication-TileColor" content={themeColor} />
    <meta name="theme-color" content={themeColor} />
  </Head>
);
function SEO({ content, url, author }) {
  const finalTitle = `${
    content ? content.title + " | " : ""
  }${description} - ${name}`;

  return (
    <>
      {author ? (
        <RenderAuthor author={author} />
      ) : (
        <RenderArticel url={url} finalTitle={finalTitle} />
      )}
      {content ? <RenderContent content={content} /> : ""}
    </>
  );
}

export { SEO };
