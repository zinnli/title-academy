import styled from "styled-components";

function DetailPost() {
     return (
          <STDetailPost>
               <div>
                    <span>작성자</span>
                    <span>날짜</span>
               </div>
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
     padding: 60px 0 30px 0;
     img {
          width: 350px;
          height: 350px;
          object-fit: cover;
          padding: 30px;
     }
     div:first-child {
          width: 350px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 15px 0 0 0;
          gap: 10px;
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
