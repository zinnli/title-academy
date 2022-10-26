import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
     AiFillEdit,
     AiFillDelete,
     AiOutlineCheck,
     AiFillHeart,
} from "react-icons/ai";
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

     //console.log("파람스", params);
     useEffect(() => {
          //console.log("유즈이펙트");
          dispatch(_getDetailPost(params));
     }, [dispatch]);

     const detailPost = useSelector(
          (state) => state.detailPost.detailPost.data
     );
     //console.log("유즈셀렉터", detailPost);

     const onDeletePost = () => {
          dispatch(_deleteDetailPost(params));
          alert("삭제되었습니다!");
          navigate("/main");
     };
     //console.log("유저정보", userinfomation);
     return (
          <STDetailPost encType="multipart/form-data">
               <div>
                    <span>{detailPost?.createdAt.split("T")[0]}</span>
                    {/* 순서바꿈 */}
                    <span>{detailPost?.title}</span>
               </div>
               <img src={detailPost?.imgUrl} alt="zzal" />
               <p>{detailPost?.content}</p>
               <div className="detail-btns">
                    {detailPost?.nickname === userinfomation?.nickname ? (
                         <>
                              <button
                                   onClick={() => navigate(`/write/${params}`)}
                              >
                                   <AiFillEdit />
                              </button>
                              <button onClick={onDeletePost}>
                                   <AiFillDelete />
                              </button>
                              <span>
                                   <AiFillHeart />
                              </span>
                              {/* 순서바꿈 */}
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
     div:first-child {
          width: 550px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 15px 0;
          font-size: 15px;
          margin: 8px 0;
          span:last-child {
               font-size: 25px;
          }
     }
     p {
          width: 550px;
          padding: 15px 20px;
          margin-bottom: 10px;
     }
     .detail-btns {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          padding: 10px;
          border-radius: 10px;
          button {
               padding: 5px 10px;
               height: fit-content;
               font-size: 20px;
               background-color: transparent;
               color: var(--color-midtone);
               border: none;
               cursor: pointer;
          }
          span {
               color: orangered;
               padding: 5px 10px;
               height: fit-content;
               font-size: 20px;
               background-color: transparent;
               border: none;
               cursor: pointer;
          }
     }
`;
