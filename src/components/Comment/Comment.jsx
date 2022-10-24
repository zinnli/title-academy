import styled from "styled-components";

function Comment({ comment }) {
  return (
    <STComment>
      <p>{comment.comment}</p>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
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
  padding: 5px 15px;
  border: 3px solid #333;
  div {
    display: flex;
    gap: 10px;
    button {
      padding: 5px 10px;
    }
  }
`;
