import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import {
     _getCommentList,
     _postComment,
} from "../../redux/modules/commentSlice";

function CommentForm() {
     const params = useParams("id").id;
     const [comment, setComment] = useState();
     const dispatch = useDispatch();

     const onChangeHandler = (e) => {
          const { name, value } = e.target;
          setComment({ ...comment, content: value, postId: params });
          //console.log("코멘트스테이트", comment);
     };

     const onCliclHandler = (comment) => {
          console.log(comment);
          dispatch(_postComment(comment));
          alert("댓글입력완료");
          setComment("");
     };

     return (
          <STCommentWrap>
               <input
                    onChange={onChangeHandler}
                    name="content"
                    type="text"
                    placeholder="댓글을 입력하세요"
                    required
               />
               <button onClick={() => onCliclHandler(comment)}>
                    <AiOutlineCheck />
               </button>
          </STCommentWrap>
     );
}

export default CommentForm;

const STCommentWrap = styled.div`
     width: 650px;
     height: 100%;
     display: flex;
     align-items: center;
     justify-content: space-between;
     gap: 20px;
     padding: 15px 15px;
     background-color: var(--color-darktext);
     border-radius: 5px;
     input {
          width: 85%;
          height: 40px;
          padding: 10px;
          border: none;
          border-radius: 5px;
     }
     button {
          padding: 8px 13px;
          font-weight: 700;
          font-size: 20px;
          color: white;
          border: none;
          border-radius: 5px;
          background-color: transparent;
          cursor: pointer;
     }
`;
