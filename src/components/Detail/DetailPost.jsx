import styled from "styled-components";

function DetailPost() {
     return (
          <STDetailPost>
               <img
                    src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdYX6k8%2FbtrzbGT2KT4%2FILq2pR7eNiWzknVETKCGR0%2Fimg.jpg"
                    alt="zzal"
               />
               <p>도와주세요 아이디어가 생각안나여 신박한걸로 부탁드려여</p>
               <div>
                    <button>수정</button>
                    <button>삭제</button>
                    <span>조아요</span>
               </div>
          </STDetailPost>
     );
}

export default DetailPost;

const STDetailPost = styled.div`
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: flex-start;
     img {
          width: 40%;
          height: 40%;
          object-fit: cover;
          padding: 50px;
     }
     div {
          width: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          padding: 10px;
          button {
               height: fit-content;
          }
     }
`;
