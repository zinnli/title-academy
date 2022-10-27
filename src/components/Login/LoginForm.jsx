import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __postLogin } from "../../redux/modules/userSlice";

function LoginForm() {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const initialState = {
          email: "",
          password: "",
     };

     const [user, setUser] = useState(initialState);
     const loginCheck = useSelector((state) => state.userList.isLogin);

     const onChangeLoginHandler = (e) => {
          const { name, value } = e.target;
          setUser({ ...user, [name]: value });
     };

     const onSubmitLoginHandler = (e) => {
          e.preventDefault();
          if (user.email.trim() === "" || user.password.trim() === "") {
               alert("체크피료해");
          }
          dispatch(__postLogin(user));
     };
     useEffect(() => {
          {
               loginCheck && navigate("/main");
          }
     }, [loginCheck]);
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
                              onChange={onChangeLoginHandler}
                         />
                    </div>
                    <div>
                         <span>비밀번호</span>
                         <input
                              type="password"
                              name="password"
                              placeholder="비밀번호를 입력해주세요"
                              required
                              onChange={onChangeLoginHandler}
                         />
                    </div>
                    <div className="login-page-btn">
                         <button
                              className="btn login-btn"
                              onClick={onSubmitLoginHandler}
                         >
                              로그인
                         </button>
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

const STLoginForm = styled.div`
     width: 100%;
     height: 100%;
     padding: 320px 0;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: flex-start;
     gap: 20px;
     form {
          width: 450px;
          height: 100%;
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
               input:focus {
                    outline: none;
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
                    font-weight: 800;
                    font-size: 13px;
                    color: #fff;
                    background-color: transparent;
                    border: 2px solid var(--color-darktext);
                    cursor: pointer;
               }
               .login-btn {
                    color: var(--color-darktext);
               }
               .login-btn:hover {
                    background-color: var(--color-darktext);
                    color: #fff;
               }
               .register-btn {
                    background-color: var(--color-darktext);
               }
          }
     }
`;
