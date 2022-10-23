import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import DetailPost from "../components/Detail/DetailPost";
import CommentList from "../components/Comment/CommentList";
import CommentForm from "../components/Comment/CommentForm";

function Detail() {
     return (
          <>
               <Header />
               <Layout>
                    <DetailPost />
                    <CommentForm />
                    <CommentList />
               </Layout>
          </>
     );
}

export default Detail;
