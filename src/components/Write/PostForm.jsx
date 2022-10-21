import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function PostForm() {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "img/default_image.png",
  });

  let inputRef;

  //image 스테이트에 이미지 넣기
  const saveImage = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      //새로운 이미지 추가시 기존 URL을 폐기 후 업로드
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      console.log("프리뷰", preview_URL);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
      console.log("이미지", image.preview_URL);
    }
  };

  // 컴포넌트가 언마운트되면 생성되어있는 URL 폐기하여 메모리 누수 방지
  // useEffect(() => {
  //   return () => {
  //     URL.revokeObjectURL(image.preview_URL);
  //   };
  // }, []);

  // const sendImageToServer = async () => {
  //   if (image.image_file) {
  //     const formData = new FormData();
  //     formData.append("file", image.image_file);
  //     await axios.post("/경로입력", formData);
  //     alert("포스트 등록 완료!");

  //     //image 스테이트 초기화
  //     setImage({
  //       image_file: "",
  //       preview_URL: "img/default_image.png",
  //     });
  //   } else {
  //     alert("사진을 등록하세요!");
  //   }
  // };

  return (
    <>
      <PostFormWrap>
        <PostTitleInput placeholder="제목입력" />

        <input
          type="file"
          accept="image/*"
          onChange={saveImage}
          onClick={(e) => e.target.value}
          ref={(refParam) => (inputRef = refParam)}
        />
        <img src={image.preview_URL} alt="첨부된이미지" />
        <button onClick={() => inputRef.click()}>사진첨부</button>

        <PostBtn>수정/완료</PostBtn>
      </PostFormWrap>
    </>
  );
}

export default PostForm;

const PostFormWrap = styled.div`
  width: 300px;
`;
const PostTitleInput = styled.input`
  width: 300px;
  height: 50px;
  background-color: cornflowerblue;
`;

const PostContentInput = styled.textarea`
  width: 300px;
  height: 100px;
  background-color: cornflowerblue;
`;

const PostBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: cornflowerblue;
`;
