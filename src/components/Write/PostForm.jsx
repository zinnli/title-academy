import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { _getDetailPost, _putPost } from "../../redux/modules/detailPostSlice";
import { _getPost, _patchPost, _postPost } from "../../redux/modules/postSlice";

function PostForm() {
     const params = useParams("id").id;
     const dispatch = useDispatch();
     const navigate = useNavigate();

     //이미지 스테이트
     const [image, setImage] = useState({
          image_file: "",
          preview_URL:
               "https://user-images.githubusercontent.com/102575747/198165680-7f796d27-c568-448c-9ed4-3a4b10db362a.png",
     });

     //게시글 스테이트
     const [post, setPost] = useState({
          title: "",
          content: "",
     });

     // 수정하기 위해 GET요청
     useEffect(() => {
          dispatch(_getDetailPost(params));
     }, [dispatch]);

     //수정 postList 할당 (수정 시 원본 데이터를 input value로 지정하기 위해 사용)
     const modifyPost = useSelector(
          (state) => state.detailPost.detailPost.data
     );

     //수정할 데이터 스테이트
     const [modifyState, setModifyState] = useState(modifyPost);

     //파일 인풋창 숨기고 버튼에 참조
     let inputRef;

     //image 스테이트에 이미지 넣기
     const saveImage = (e) => {
          e.preventDefault();

          //기존 이미지가 있는데 새로운 이미지 추가 시 기존 URL을 폐기 후 업로드
          if (e.target.files[0]) {
               URL.revokeObjectURL(image.preview_URL);
               const preview_URL = URL.createObjectURL(e.target.files[0]);

               setImage(() => ({
                    image_file: e.target.files[0],
                    preview_URL: preview_URL,
               }));

               //최초 이미지 선택시 업로드
          } else {
               const preview_URL = URL.createObjectURL(e.target.files[0]);

               setImage(() => ({
                    image_file: e.target.files[0],
                    preview_URL: preview_URL,
               }));
          }
          setPost({ ...post, image: image.preview_URL });
     };

     // 컴포넌트가 언마운트되면 생성되어있는 URL 폐기하여 메모리 누수 방지
     useEffect(() => {
          return () => {
               URL.revokeObjectURL(image.preview_URL);
          };
     }, []);

     //입력 온체인지 핸들러
     const onChangeHandler = (e) => {
          const { name, value } = e.target;
          setPost({ ...post, [name]: value, image: image.preview_URL });
          //수정값 스테이트 변경
          setModifyState({ ...modifyState, [name]: value });
     };

     //수정완료 버튼  (리퀘스트 부분 확실히 알아야 함)
     const onPatchHandler = (modifyState, params) => {
          dispatch(_putPost({ modifyState, params }));
          alert("수정완료!");
          navigate(-1);
     };

     // 작성완료 버튼 (폼데이터 변환)
     const onSubmitHandler = () => {
          const formData = new FormData();
          formData.append("file", image.image_file);
          formData.append(
               "post",
               new Blob([JSON.stringify(post)], { type: "application/json" })
          );
          dispatch(_postPost(formData));
          alert("작성완료!");
          navigate("/main");
     };
     return (
          <>
               {!params ? (
                    //글쓰기
                    <PostFormWrap>
                         <input
                              name="title"
                              onChange={onChangeHandler}
                              placeholder="제목입력"
                         />

                         <input
                              className="img-input"
                              type="file"
                              accept="image/*"
                              name="image_file"
                              onChange={saveImage}
                              //인풋을 안보이게하고 버튼에 레퍼런스 입력함
                              ref={(refParam) => (inputRef = refParam)}
                         />

                         <img src={image?.preview_URL} alt="첨부된이미지" />
                         <button
                              className="pic-btn"
                              type="button"
                              onClick={() => inputRef.click()}
                         >
                              사진첨부
                         </button>
                         <textarea
                              name="content"
                              onChange={onChangeHandler}
                              placeholder="내용입력"
                         />
                         <button
                              className="upload-btn"
                              type="button"
                              onClick={() => onSubmitHandler(post)}
                         >
                              업로드
                         </button>
                    </PostFormWrap>
               ) : (
                    //글 수정
                    <PostFormWrap>
                         <input
                              name="title"
                              onChange={onChangeHandler}
                              placeholder="제목입력"
                              value={modifyState?.title}
                         />

                         <input
                              className="img-input"
                              type="file"
                              accept="image/*"
                              name="image_file"
                              onChange={saveImage}
                              onClick={(e) => e.target.value}
                              ref={(refParam) => (inputRef = refParam)}
                         />
                         <img src={modifyState?.imgUrl} alt="첨부된이미지" />
                         <p>사진은 변경이 불가능 합니다..!!</p>

                         <textarea
                              name="content"
                              onChange={onChangeHandler}
                              placeholder="내용입력"
                              value={modifyState?.content}
                         />
                         <button
                              className="pic-btn"
                              type="button"
                              onClick={() =>
                                   onPatchHandler(modifyState, params)
                              }
                         >
                              수정완료
                         </button>
                    </PostFormWrap>
               )}
          </>
     );
}

export default PostForm;

const PostFormWrap = styled.form`
     width: 550px;
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 120px 0;
     gap: 10px;
     input {
          width: 80%;
          height: auto;
          padding: 15px;
          border: 2px solid var(--color-darktext);
          border-radius: 5px;
     }
     .img-input {
          display: none;
     }
     div {
          width: 300px;
          height: 250px;
          border: 2px solid #333;
     }
     textarea {
          width: 80%;
          height: 150px;
          padding: 20px;
          border: 2px solid var(--color-darktext);
          border-radius: 5px;
          margin: 15px 0;
     }
     button {
          width: 30%;
          padding: 10px;
          font-weight: 800;
          font-size: 13px;
          color: #fff;
          background-color: transparent;
          border: 2px solid var(--color-darktext);
          cursor: pointer;
     }
     .pic-btn {
          color: var(--color-darktext);
     }
     .pic-btn:hover {
          background-color: var(--color-darktext);
          color: #fff;
     }
     .upload-btn {
          background-color: var(--color-darktext);
     }
     img {
          width: 320px;
          height: 320px;
          object-fit: cover;
          padding: 20px;
     }
`;
