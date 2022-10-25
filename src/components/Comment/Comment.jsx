import { useState } from "react";
import styled from "styled-components";

function Comment({ comment }) {
  const [cmtToggle, setCmtToggle] = useState(true);
  const onToggleHandler = () => {
    setCmtToggle(!cmtToggle);
  };

  return (
    <STComment>
      {cmtToggle ? <p>{comment.comment}</p> : <input />}

      <div>
        <div>
          {cmtToggle ? (
            <button onClick={onToggleHandler}>수정</button>
          ) : (
            <button onClick={onToggleHandler}>완료</button>
          )}
        </div>
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
