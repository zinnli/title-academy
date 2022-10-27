import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __postUser } from "../../redux/modules/userSlice";

function RegisterForm() {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const initialState = {
          email: "",
          password: "",
          passwordCheck: "",
          nickname: "",
     };

     const [user, setUser] = useState(initialState);

     const { email, password, nickname, passwordCheck } = user;

     //상태관리 위해 초기값 세팅
     const [emailInput, setEmailInput] = useState("");
     const [passInput, setPassInput] = useState("");
     const [passCheckInput, setPassCheckInput] = useState("");
     const [nicknameInput, setNicknameInput] = useState("");

     // //유효성 검사
     const regEmail =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
     const regPassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d@$!%*#?&]{8,16}$/;
     const regNickname = /^[ㄱ-ㅎ|가-힣]{2,6}$/;

     const onChangeUserHandler = (e) => {
          const { name, value } = e.target;
          setUser({ ...user, [name]: value });

          if (name === "email")
               !regEmail.test(value)
                    ? setEmailInput("이메일 형식으로 입력해주세요.")
                    : setEmailInput("");

          if (name === "password")
               !regPassword.test(value)
                    ? setPassInput(
                           `8~16자의 영문 대소문자와 숫자로 입력해주세요.
                           특수문자(!@#$%^&*)도 사용 가능합니다.`
                      )
                    : setPassInput("");

          if (name === "nickname")
               !regNickname.test(value)
                    ? setNicknameInput("닉네임은 한글 2-6자로 입력해주세요.")
                    : setNicknameInput("");
     };

     //회원가입 완료
     const onSubmitUserHandler = (e) => {
          e.preventDefault();
          if (
               email.trim() === "" ||
               password.trim() === "" ||
               passwordCheck.trim() === "" ||
               nickname.trim() === ""
          ) {
               return alert("아이디랑 비밀번호를 확인해주세요!!");
          }
          dispatch(
               __postUser({
                    email,
                    password,
                    nickname,
               })
          );
          navigate("/");
     };

     return (
          <STRegisterForm>
               <h2>회원가입</h2>
               <form onSubmit={onSubmitUserHandler}>
                    <div>
                         <span>아이디</span>
                         <input
                              type="email"
                              name="email"
                              value={email}
                              placeholder="이메일을 입력해주세요"
                              onChange={onChangeUserHandler}
                         />
                    </div>
                    <p id="help-user" className="help">
                         {emailInput}
                    </p>
                    <div>
                         <span>비밀번호</span>
                         <input
                              type="password"
                              name="password"
                              value={password}
                              placeholder="비밀번호를 입력하세요"
                              onChange={onChangeUserHandler}
                         />
                    </div>
                    <p id="help-password1" className="help">
                         {passInput}
                    </p>
                    <div>
                         <span>비밀번호 확인</span>
                         <input
                              type="password"
                              name="passwordCheck"
                              value={passwordCheck}
                              placeholder="비밀번호 확인해주세요"
                              onChange={onChangeUserHandler}
                         />
                    </div>
                    <p id="help-password2" className="help">
                         {passCheckInput}
                    </p>
                    <div>
                         <span>닉네임</span>
                         <input
                              type="text"
                              name="nickname"
                              value={nickname}
                              placeholder="닉네임을 입력해주세요"
                              onChange={onChangeUserHandler}
                         />
                    </div>
                    <p id="help-nick" className="help">
                         {nicknameInput}
                    </p>

                    <button
                         onClick={() => navigate("/register")}
                         className="enter-btn"
                    >
                         회원가입 완료
                    </button>
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
          width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px;
          div {
               width: 100%;
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 10px;
               span {
                    width: 105px;
               }
               input {
                    width: 65%;
                    padding: 15px;
                    border: none;
                    border-bottom: 2px solid #444;
               }
               input:focus {
                    outline: none;
               }
          }
          .enter-btn {
               width: 35%;
               padding: 10px;
               margin-top: 30px;
               font-size: 15px;
               font-weight: 700;
               color: white;
               background-color: var(--color-darktext);
               border: none;
          }

          .enter-btn:hover {
               background-color: var(--color-darktext);
               color: #fff;
          }
          p {
               white-space: pre-line;
               width: 300px;
               height: 40px;
               margin-left: 130px;
               font-size: 11px;
               color: var(--color-midtone);
          }
     }
`;
