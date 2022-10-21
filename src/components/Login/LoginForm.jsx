import styled from "styled-components";

function LoginForm() {
     return (
          <STLoginForm>
               <h2>로그인</h2>
               <form>
                    <div>
                         <span>아이디</span>
                         <input
                              type="email"
                              placeholder="이메일을 입력해주세요"
                              required
                         />
                    </div>
                    <div>
                         <span>비밀번호</span>
                         <input
                              type="password"
                              placeholder="영문 대,소문자와 숫자가 1개 이상 포함된 8~16자이내의 조합으로 작성해주세요"
                              required
                         />
                    </div>
                    <div className="login-page-btn">
                         <button className="btn login-btn">로그인</button>
                         <button className="btn register-btn">회원가입</button>
                    </div>
               </form>
          </STLoginForm>
     );
}

export default LoginForm;

const STLoginForm = styled.form`
     width: 100%;
     height: 100%;
     padding: 160px 0;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: flex-start;
     gap: 20px;
     form {
          width: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          div {
               width: 100%;
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 15px;
               span {
                    width: 105px;
               }
               input {
                    width: 80%;
                    padding: 10px;
               }
          }
          .login-page-btn {
               display: flex;
               justify-content: flex-end;
               margin-top: 30px;
               gap: 30px;
               button {
                    width: 30%;
                    padding: 10px;
               }
          }
          /* .btn {
               width: 35%;
               padding: 10px;
               margin-top: 30px;
          } */
     }
`;
