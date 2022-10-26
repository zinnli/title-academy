import { useState } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { _deleteComment, _putcomment } from "../../redux/modules/commentSlice";
import { useParams } from "react-router-dom";

function Comment({ comment }) {
  const params = useParams("id").id;
  console.log("파람", params);
  const dispatch = useDispatch();
  const [cmtToggle, setCmtToggle] = useState(true);

  const [editComment, setEditComment] = useState();

  const onToggleHandler = () => {
    setCmtToggle(!cmtToggle);
  };

  const onDelComHandler = (params) => {
    dispatch(_deleteComment(params));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditComment({ ...editComment, [name]: value });
  };

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

  return (
    <STComment>
      {cmtToggle ? (
        <p>{comment.content}</p>
      ) : (
        <input name="content" onChange={onChangeHandler} />
      )}

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
        <button onClick={() => onDelComHandler(params)}>
          <AiFillDelete />
        </button>
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
  padding: 10px 15px;
  border: 2px solid var(--color-darktext);
  border-radius: 5px;
  color: var(--color-darktext);
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
