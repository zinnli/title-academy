import { useState } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { _deleteComment, _putcomment } from "../../redux/modules/commentSlice";
import { useParams } from "react-router-dom";

function Comment({ comment }) {
     const params = useParams("id").id;
     const dispatch = useDispatch();
     const userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
     const [editComment, setEditComment] = useState();

     //수정버튼 토글
     const [cmtToggle, setCmtToggle] = useState(true);
     const onToggleHandler = () => {
          setCmtToggle(!cmtToggle);
     };

     //코멘트 수정 인풋 온체인지 핸들러
     const onChangeHandler = (e) => {
          const { name, value } = e.target;
          setEditComment({ ...editComment, [name]: value });
     };

     //코멘트 수정 버튼
     const onEditHandler = () => {
          dispatch(
               _putcomment({
                    postId: params,
                    commentId: comment.id,
                    editComment,
               })
          );
          setCmtToggle(!cmtToggle);
     };

     //삭제버튼
     const onDelComHandler = () => {
          dispatch(_deleteComment({ postId: params, commentId: comment.id }));
     };

     return (
          <STComment>
               {cmtToggle ? (
                    <p>{comment.content}</p>
               ) : (
                    <input name="content" onChange={onChangeHandler} />
               )}
               {userinfo.nickname === comment.author ? (
                    <div>
                         <div>
                              {cmtToggle ? (
                                   <button onClick={onToggleHandler}>
                                        <AiFillEdit />
                                   </button>
                              ) : (
                                   <button onClick={onEditHandler}>
                                        <AiOutlineCheck />
                                   </button>
                              )}
                         </div>
                         <button onClick={() => onDelComHandler()}>
                              <AiFillDelete />
                         </button>
                    </div>
               ) : null}
          </STComment>
     );
}

export default Comment;

const STComment = styled.div`
     width: 100%;
     height: auto;
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 10px 15px;
     border: 2px solid var(--color-darktext);
     border-radius: 5px;
     color: var(--color-darktext);
     input {
          width: 80%;
     }
     input:focus {
          outline: none;
     }
     div {
          display: flex;
          gap: 10px;
          button {
               padding: 5px 8px 3px 8px;
               font-size: 16px;
               background-color: transparent;
               border: none;
               color: var(--color-primary);
               cursor: pointer;
          }
     }
`;
