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

  const [image, setImage] = useState({
    image_file: "",
    preview_URL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Octicons-cloud-upload.svg/1200px-Octicons-cloud-upload.svg.png",
  });
  console.log("파람스 유무", params);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  // 수정하기 위해 get요청
  useEffect(() => {
    dispatch(_getDetailPost(params));
  }, [dispatch]);

  //수정 postList 할당
  const modifyPost = useSelector((state) => state.detailPost.detailPost.data);
  console.log("수정쪽", modifyPost);

  //수정할 post 필터링
  // const modifyPost = postList.filter((post) => {
  //   return post.id == params;
  // })[0];
  const [modifyState, setModifyState] = useState(modifyPost);

  //파일 인풋창 숨기고 버튼에 참조
  let inputRef;

  //image 스테이트에 이미지 넣기
  const saveImage = (e) => {
    e.preventDefault();

    if (e.target.files[0]) {
      //새로운 이미지 추가시 기존 URL을 폐기 후 업로드
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);

      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
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
    // setModifyState({
    //   ...modifyState,
    //   [name]: value,
    //   image: image.preview_URL,
    // });

    setModifyState({ ...modifyState, [name]: value });
  };
  console.log(modifyState);
  //제이슨 서버 이용(이미지없음)
  // const onSubmitHandler = (post) => {
  //      dispatch(_postPost(post));
  //      alert("작성완료!");
  //      navigate("/main");
  // };

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
            // onClick={(e) => e.target.value}
            ref={(refParam) => (inputRef = refParam)}
          />

          <img src={image?.preview_URL} alt="첨부된이미지" />
          <button type="button" onClick={() => inputRef.click()}>
            사진첨부
          </button>
          <textarea
            name="content"
            onChange={onChangeHandler}
            placeholder="내용입력"
          />
          <button type="button" onClick={() => onSubmitHandler(post)}>
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
          {/* <button type="button" onClick={() => inputRef.click()}>
            사진첨부
          </button> */}
          <textarea
            name="content"
            onChange={onChangeHandler}
            placeholder="내용입력"
            value={modifyState?.content}
          />
          <button
            type="button"
            onClick={() => onPatchHandler(modifyState, params)}
          >
            수정완료
          </button>
        </PostFormWrap>
      )}

      {/* <PostFormWrap>
        <input name="title" onChange={onChangeHandler} placeholder="제목입력" />

        <input
          className="img-input"
          type="file"
          accept="image/*"
          name="image_file"
          onChange={saveImage}
          // onClick={(e) => e.target.value}
          ref={(refParam) => (inputRef = refParam)}
        />
        <img src={image.preview_URL} alt="첨부된이미지" />
        <button type="button" onClick={() => inputRef.click()}>
          사진첨부
        </button>
        <textarea
          name="content"
          onChange={onChangeHandler}
          placeholder="내용입력"
        />
        <button type="button" onClick={() => onSubmitHandler(post)}>
          수정/완료
        </button>
      </PostFormWrap> */}
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
  gap: 30px;
  input {
    width: 80%;
    height: auto;
    padding: 15px;
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
    width: 550px;
    height: 250px;
    padding: 20px;
  }
  button {
    width: 30%;
    padding: 10px;
  }
  img {
    width: 350px;
    height: 350px;
    object-fit: cover;
    padding: 30px;
  }
`;
