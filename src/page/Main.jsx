import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import PostList from "../components/Post/PostList";
function Main() {
  return (
    <>
      <Header />
      <Layout>
        <PostList />
      </Layout>
    </>
  );
}

export default Main;
