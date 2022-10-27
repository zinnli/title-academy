import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __postLogin } from "../../redux/modules/userSlice";

function LoginForm() {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     //초기값
     const initialState = {
          email: "",
          password: "",
     };

     //유저 스테이트 생성
     const [user, setUser] = useState(initialState);

     //로그인 체크 전역변수 불러오기
     const loginCheck = useSelector((state) => state.userList.isLogin);

     //로그인에 필요한 인풋값 유저스테이트에 저장
     const onChangeLoginHandler = (e) => {
          const { name, value } = e.target;
          setUser({ ...user, [name]: value });
     };

     //로그인 POST 요청
     const onSubmitLoginHandler = (e) => {
          e.preventDefault();
          if (user.email.trim() === "" || user.password.trim() === "") {
               alert("체크피료해");
          }
          dispatch(__postLogin(user));
     };

     //로그인 체크 확인 시 메인페이지로 이동
     useEffect(() => {
          loginCheck && navigate("/main");
     }, [loginCheck, navigate]);
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
