import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function LoginForm() {
     const navigate = useNavigate();
     return (
          <STLoginForm>
               <h2>로그인</h2>
               <form>
                    <div>
                         <span>아이디</span>
                         <input
                              type="email"
                              name="email"
                              placeholder="이메일 형식으로 입력해주세요"
                              required
                         />
                    </div>
                    <div>
                         <span>비밀번호</span>
                         <input
                              type="password"
                              name="password"
                              placeholder="비밀번호를 입력해주세요"
                              required
                         />
                    </div>
                    <div className="login-page-btn">
                         <button className="btn login-btn">로그인</button>
                         <button
                              className="btn register-btn"
                              onClick={() => navigate("/register")}
                         >
                              회원가입
                         </button>
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
                    width: 80px;
               }
               input {
                    width: 80%;
                    padding: 10px;
                    border: none;
                    border-bottom: 2px solid #444;
               }
          }
          .login-page-btn {
               display: flex;
               justify-content: space-between;
               margin-top: 30px;
               gap: 30px;
               button {
                    width: 43%;
                    padding: 10px;
                    font-weight: 600;
                    font-size: 13px;
                    color: var(--color-white);
                    background-color: transparent;
                    border: 2px solid var(--color-darktext);
               }
               .login-btn {
                    color: var(--color-darktext);
               }
               .login-btn:hover {
                    background-color: var(--color-midtone);
               }
               .register-btn {
                    background-color: var(--color-darktext);
               }
          }
     }
`;
