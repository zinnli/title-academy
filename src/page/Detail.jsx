import React from "react";
import Layout from "../components/Layout/Layout";
import DetailPost from "../components/Detail/DetailPost";
import CommentList from "../components/Comment/CommentList";
import CommentForm from "../components/Comment/CommentForm";

function Detail() {
     return (
          <>
               <Layout>
                    <DetailPost />
                    <CommentForm />
                    <CommentList />
               </Layout>
          </>
     );
}

export default Detail;
