import Layout from "../components/Layout/Layout";
import PostForm from "../components/Write/PostForm";
import Header from "../components/Header/Header";
function Write() {
  return (
    <>
      <Header />
      <Layout>
        <PostForm />
      </Layout>
    </>
  );
}

export default Write;
