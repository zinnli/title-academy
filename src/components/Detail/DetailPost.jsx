import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
     _deleteDetailPost,
     _getDetailPost,
} from "../../redux/modules/detailPostSlice";

function DetailPost() {
     const access_token = sessionStorage.getItem("access_token");
     const userinfomation = JSON.parse(sessionStorage.getItem("userinfo"));
     const navigate = useNavigate();
     const params = useParams("id").id;
     const dispatch = useDispatch();

     console.log("파람스", params);
     useEffect(() => {
          console.log("유즈이펙트");
          dispatch(_getDetailPost(params));
     }, [dispatch]);

     const detailPost = useSelector(
          (state) => state.detailPost.detailPost.data
     );
     console.log("유즈셀렉터", detailPost);

     const onDeletePost = () => {
          dispatch(_deleteDetailPost(params));
          alert("삭제되었습니다!");
          navigate("/main");
     };
     console.log("유저정보", userinfomation);
     return (
          <STDetailPost encType="multipart/form-data">
               <div>
                    <span>{detailPost?.title}</span>
                    <span>{detailPost?.createdAt.split("T")[0]}</span>
               </div>
               <img src={detailPost?.imgUrl} alt="zzal" />
               <p>{detailPost?.content}</p>
               <div>
                    {detailPost?.nickname === userinfomation?.nickname ? (
                         <>
                              <button
                                   onClick={() => navigate(`/write/${params}`)}
                              >
                                   수정
                              </button>
                              <button onClick={onDeletePost}>삭제</button>
                              <span>조아요</span>
                         </>
                    ) : null}
                    {/* <button onClick={() => navigate(`/write/${params}`)}>수정</button>
        <button onClick={onDeletePost}>삭제</button>
        <span>조아요</span> */}
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
