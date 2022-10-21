import styled from "styled-components";

function Post() {
  return (
    <>
      <PostWrap>
        <PostPicture>여긴 사진입니다.</PostPicture>
        <PostTilte>여긴 제목입니다.</PostTilte>
      </PostWrap>
    </>
  );
}

export default Post;
const PostWrap = styled.div`
  height: 250px;

  margin: 20px 30px 20px 30px;
`;

const PostPicture = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
`;
const PostTilte = styled.div`
  height: 50px;
  width: 200px;
  margin-top: 10px;
  background-color: teal;
`;
