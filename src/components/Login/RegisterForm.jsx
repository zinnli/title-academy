import styled from "styled-components";

function RegisterForm() {
     return (
          <STRegisterForm>
               <h2>회원가입</h2>
               <form>
                    <div>
                         <span>아이디</span>
                         <input
                              type="email"
                              placeholder="이메일을 입력해주세요"
                              required
                         />
                         <button>중복확인</button>
                    </div>
                    <div>
                         <span>비밀번호</span>
                         <input
                              type="password"
                              placeholder="영문 대,소문자와 숫자가 1개 이상 포함된 8~16자이내의 조합으로 작성해주세요"
                              required
                         />
                    </div>
                    <div>
                         <span>비밀번호 확인</span>
                         <input
                              type="password"
                              placeholder="비밀번호 확인"
                              required
                         />
                         <button>중복확인</button>
                    </div>
                    <div>
                         <span>닉네임</span>
                         <input
                              type="text"
                              placeholder="닉네임을 입력해주세요"
                              required
                         />
                         <button>중복확인</button>
                    </div>

                    <button className="enter-btn">회원가입 완료</button>
               </form>
          </STRegisterForm>
     );
}

export default RegisterForm;

const STRegisterForm = styled.div`
     width: 100%;
     height: 100%;
     padding: 160px 0;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: flex-start;
     gap: 20px;
     form {
          width: 550px;
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 20px;
          padding: 20px;
          div {
               width: 100%;
               display: flex;
               align-items: center;
               justify-content: flex-start;
               gap: 15px;
               span {
                    width: 105px;
               }
               input {
                    width: 45%;
                    padding: 10px;
               }
               button {
                    width: 20%;
                    padding: 10px;
               }
          }
          .enter-btn {
               width: 35%;
               padding: 10px;
               margin-top: 30px;
          }
     }
`;
