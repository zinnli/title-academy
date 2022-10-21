import React from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import DetailPost from "../components/Detail/DetailPost";
import CommentList from "../components/Comment/CommentList";

function Detail() {
     return (
          <Layout>
               <Header />
               <DetailPost />
               <CommentList />
          </Layout>
     );
}

export default Detail;
