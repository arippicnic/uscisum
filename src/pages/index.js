import React from "react";

import Toast, { useToasts } from "@/components/Toast";
import SEO from "@/components/SEO";
import Post from "@/components/Post";
import Link from "@/components/Link";
import Error from "@/components/Error";
import Search from "@/components/Search";

const Home = (props) => {
  if (props.error) return <Error {...props} />;
  const [toast, setToast] = useToasts();
  return (
    <>
      <SEO />
      {toast ? <Toast>{toast}</Toast> : null}
      <div className="body-content">
        <Search />
        <ul>
          {props.data.map((post) => (
            <li key={post._id} className="py-1">
              <Link href={`/${post._id}`}>
                <Post title={post.title} body={post.body} createdAt={post.createdAt} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export async function getServerSideProps({ req, res }) {
  try {
    const { HOST } = process.env;
    const data = await (await fetch(`${HOST}api/posts`)).json();
    return {
      props: { url: `${HOST}`, data },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
        code: "GENERIC",
      },
    };
  }
}
export default Home;
