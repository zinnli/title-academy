import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { _getPost } from "../../redux/modules/postSlice";

function Post({ post }) {
  return (
    <>
      <PostWrap>
        <img src={post.image} />
        <PostTilte>{post.content}</PostTilte>
      </PostWrap>
    </>
  );
}

export default Post;
const PostWrap = styled.div`
  height: 250px;

  margin: 20px 30px 20px 30px;
  img {
    object-fit: cover;
    height: 200px;
    width: 200px;
  }
`;

const PostTilte = styled.div`
  height: 50px;
  width: 200px;
  margin-top: 10px;
  background-color: teal;
`;
