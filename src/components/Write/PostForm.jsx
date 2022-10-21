import { useState } from "react";
import styled from "styled-components";

function PostForm() {
     return (
          <>
               <PostFormWrap>
                    <input placeholder="제목입력" />
                    <textarea placeholder="내용입력" />
                    <div>
                         <p>사진 첨부 부분</p>
                    </div>
                    <input className="img-input" type="file" accept="image/*" />
                    <button>수정/완료</button>
               </PostFormWrap>
          </>
     );
}

export default PostForm;

const PostFormWrap = styled.form`
     width: 550px;
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 120px 0;
     gap: 30px;
     input {
          width: 80%;
          height: auto;
          padding: 15px;
     }
     .img-input {
          display: none;
     }
     div {
          width: 300px;
          height: 250px;
          border: 2px solid #333;
     }
     textarea {
          width: 550px;
          height: 250px;
          padding: 20px;
     }
     button {
          width: 30%;
          padding: 10px;
     }
`;
