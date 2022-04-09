import SEO from "@/components/SEO";
import Toast, { useToasts } from "@/components/Toast";
import Post from "@/components/Post";
import Vote from "@/components/Vote";
import Error from "@/components/Error";
import Search from "@/components/Search";

const Home = (props) => {
  if (props.error) return <Error {...props} />;
  const [toast, setToast] = useToasts();
  return (
    <>
      <SEO content={props.data} url={props.url} />
      {toast ? <Toast>{toast}</Toast> : null}
      <div className="body-content">
        <Search />
        <Post title={props.data.title} body={props.data.body} createdAt={props.data.createdAt} />
        <Vote vote={props.data.vote} idPost={props.data._id} />
      </div>
    </>
  );
};
export async function getServerSideProps({ query }) {
  try {
    const { HOST } = process.env;
    const data = await (await fetch(`${HOST}api/posts/post/${query.id}`)).json();
    if (data.error) {
      return {
        notFound: true,
      };
    }
    return {
      props: { url: `${HOST}${query.id}`, data },
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
