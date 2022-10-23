import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { _postComment } from "../../redux/modules/commentSlice";

function CommentForm() {
  const params = useParams("id").id;
  const [comment, setComment] = useState();
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, comment: value, postId: params });
    console.log("코멘트스테이트", comment);
  };

  const onCliclHandler = (comment) => {
    dispatch(_postComment(comment));
  };

  return (
    <STCommentWrap>
      <input
        onChange={onChangeHandler}
        name="comment"
        type="text"
        placeholder="댓글을 입력하세요"
        required
      />
      <button onClick={() => onCliclHandler(comment)}>입력</button>
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
  padding: 10px;
  input {
    width: 80%;
    padding: 10px;
  }
  button {
    padding: 10px 20px;
  }
`;
