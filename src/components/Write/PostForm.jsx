import { useState } from "react";
import styled from "styled-components";

function PostForm() {
  return (
    <>
      <PostFormWrap>
        <PostTitleInput placeholder="제목입력" />
        <PostPictureInputBtn>사진 첨부 부분</PostPictureInputBtn>
        <PostPictureInput type="file" accept="image/*" />
        <PostContentInput placeholder="내용입력" />
        <PostBtn>수정/완료</PostBtn>
      </PostFormWrap>
    </>
  );
}

export default PostForm;

const PostFormWrap = styled.form`
  width: 300px;
  margin: 0 auto;
`;
const PostTitleInput = styled.input`
  width: 300px;
  height: 50px;
  background-color: teal;
  margin: 10px auto;
`;
const PostPictureInput = styled.input`
  display: none;
`;
const PostPictureInputBtn = styled.div`
  width: 300px;
  height: 250px;
  background-color: teal;
  margin: 10px auto;
`;
const PostContentInput = styled.textarea`
  width: 300px;
  height: 100px;
  background-color: teal;
  margin: 10px auto;
`;

const PostBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: teal;
  margin: 10px auto;
`;
