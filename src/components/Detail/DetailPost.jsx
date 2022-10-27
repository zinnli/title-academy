import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import {
  _deleteDetailPost,
  _getDetailPost,
  _postLike,
} from "../../redux/modules/detailPostSlice";

function DetailPost() {
  const userinfomation = JSON.parse(sessionStorage.getItem("userinfo"));
  const navigate = useNavigate();
  const params = useParams("id").id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getDetailPost(params));
  }, [dispatch, params]);

  //상세포스트 전역변수 가져오기
  const detailPost = useSelector((state) => state.detailPost.detailPost.data);

  //좋아요 버튼 포스트 요청
  const onClickLike = () => {
    dispatch(_postLike(params));
  };

  //상세포스트 DELETE 요청
  const onDeletePost = () => {
    dispatch(_deleteDetailPost(params));
    alert("삭제되었습니다!");
    navigate("/main");
  };

  return (
    <STDetailPost encType="multipart/form-data">
      <div className="title">
        <span>{detailPost?.title}</span>
        <span>{detailPost?.createdAt.split("T")[0]}</span>
      </div>
      <img src={detailPost?.imgUrl} alt="zzal" />
      <p>{detailPost?.content}</p>
      <div className="detail-btns">
        <div className="heart-btn">
          <div className="thumbs-btn">
            <span onClick={onClickLike}>
              {detailPost?.likeCheck ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </span>
            <span className="thumbs">{detailPost?.likeCnt}</span>
          </div>
          {detailPost?.nickname === userinfomation?.nickname ? (
            <>
              <button onClick={() => navigate(`/write/${params}`)}>수정</button>
              <button onClick={onDeletePost}>삭제</button>
            </>
          ) : null}
        </div>
      </div>
    </STDetailPost>
  );
}

export default DetailPost;

const STDetailPost = styled.div`
  width: 650px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 100px;
  padding: 0px 0 30px 0;
  border: 2px solid var(--color-darktext);
  border-radius: 10px;
  img {
    width: 350px;
    height: 350px;
    object-fit: cover;
    padding: 20px;
  }

  .title {
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px 0;
    font-size: 30px;
    margin: 8px 0;
    span:last-child {
      font-size: 15px;
    }
  }
  p {
    width: 350px;
    font-size: 20px;
    padding: 15px 20px;
    margin-bottom: 10px;
    text-align: center;
  }
  .detail-btns {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    .heart-btn {
      span {
        color: var(--color-midtone);
        padding: 5px 5px;
        font-weight: 600;
        height: fit-content;
        font-size: 22px;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
      .thumbs-btn {
        font-size: 15px;
        display: flex;
        justify-content: flex-end;
        position: relative;
        margin-bottom: 20px;
        .thumbs {
          position: relative;
          height: fit-content;
          display: block;
          top: 1px;
          font-size: 20px;
        }
      }
    }
    button {
      padding: 10px 10px 0px 10px;
      height: fit-content;
      font-size: 18px;
      font-weight: 700;
      background-color: transparent;
      color: var(--color-midtone);
      border: none;
      cursor: pointer;
    }
  }
`;
