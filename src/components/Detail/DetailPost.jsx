import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { _deletePost, _getPost } from "../../redux/modules/postSlice";

function DetailPost() {
  const navigate = useNavigate();
  const params = useParams("id").id;
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList.postList);

  useEffect(() => {
    dispatch(_getPost());
  }, [dispatch]);

  const onDeletePost = () => {
    dispatch(_deletePost(params));
    alert("삭제되었습니다!");
    navigate("/main");
  };

  //postList에서 id로 게시물 조회
  const post = postList.filter((post) => {
    return post.id == params;
  })[0];

  return (
    <STDetailPost encType="multipart/form-data">
      <div>
        <span>{post.title}</span>
        <span>날짜</span>
      </div>
      <img src={post.image} alt="zzal" />
      <p>{post.content}</p>
      <div>
        <button onClick={() => navigate(`/write/${params}`)}>수정</button>
        <button onClick={onDeletePost}>삭제</button>
        <span>조아요</span>
      </div>
    </STDetailPost>
  );
}

export default DetailPost;

const STDetailPost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 0 30px 0;
  img {
    width: 350px;
    height: 350px;
    object-fit: cover;
    padding: 30px;
  }
  div:first-child {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0 0 0;
    gap: 10px;
  }
  div {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 10px;
    button {
      height: fit-content;
    }
  }
`;
