import styled from "styled-components";
import Comment from "../Comment/Comment";

function CommentList() {
     return (
          <STCommentList>
               <Comment />
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
