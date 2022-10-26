import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { _getCommentList } from "../../redux/modules/commentSlice";
import Comment from "../Comment/Comment";

function CommentList() {
  const params = useParams("id").id;
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentList.commentList);
  useEffect(() => {
    dispatch(_getCommentList(params));
  }, [dispatch]);

  return (
    <STCommentList>
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </STCommentList>
  );
}

export default CommentList;

const STCommentList = styled.div`
  width: 650px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
`;
