import styled from "styled-components";

import Post from "./Post";

function PostList() {
  return (
    <PostListWrap>
      <Post />
      <Post />
      <Post />
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
