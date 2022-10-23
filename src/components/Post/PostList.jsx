import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { _getPost } from "../../redux/modules/postSlice";

import Post from "./Post";

function PostList() {
  const navigate = useNavigate();
  const { isLoading, error, postList } = useSelector((state) => state.postList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(_getPost());
  }, [dispatch]);

  if (isLoading) {
    return <div> 로딩중 .... </div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  console.log("포스트컴포넌트", postList);
  return (
    <PostListWrap>
      {postList.map((post) => {
        return (
          <div onClick={() => navigate(`/detail/${post.id}`)} key={post.id}>
            <Post post={post} />
          </div>
        );
      })}
    </PostListWrap>
  );
}

export default PostList;

const PostListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
