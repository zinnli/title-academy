import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { _getDetailPost } from "../../redux/modules/detailPostSlice";
import { _getPost } from "../../redux/modules/postSlice";

function Post({ post }) {
  return (
    <>
      <PostWrap>
        <img src={post.imgUrl} alt="main-img" />
        <PostTitle>{post.content}</PostTitle>
      </PostWrap>
    </>
  );
}

export default Post;
const PostWrap = styled.div`
  width: 220px;
  height: 320px;
  padding: 20px 20px;
  border: 2px solid var(--color-primary);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  img {
    object-fit: cover;
    width: 180px;
    height: 180px;
    background-color: #fff;
    border: 1px solid var(--color-primary);
  }
  &:hover {
    border: 3px solid var(--color-primary);
    box-shadow: 3px 3px 5px 2px var(--color-primary);
  }
`;

const PostTitle = styled.div`
  height: 60px;
  width: 180px;
  margin-top: 8px;
  padding: 8px;
  border-top: 2px solid var(--color-primary);
  overflow: hidden;
`;
