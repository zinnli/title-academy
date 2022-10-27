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

  //코멘트 GET 요청
  useEffect(() => {
    dispatch(_getCommentList(params));
  }, [dispatch, params]);

  return (
    <STCommentList>
      {comments.data?.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </STCommentList>
  );
}

export default CommentList;

const STCommentList = styled.div`
  width: 670px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  margin-bottom: 80px;
`;
