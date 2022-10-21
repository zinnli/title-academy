import styled from "styled-components";

function CommentForm() {
     return (
          <STCommentForm>
               <input type="text" placeholder="댓글을 입력하세요" required />
               <button>입력</button>
          </STCommentForm>
     );
}

export default CommentForm;

const STCommentForm = styled.form`
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
