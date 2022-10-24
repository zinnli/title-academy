import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __posttUser } from "../../redux/moudule/userSlice";

function RegisterForm() {
     const dispatch = useDispatch();
     //const newUser = useSelector((state) => state.user);

     const initialState = {
          id: 0,
          email: "",
          password: "",
          passwordCheck: "",
          nickname: "",
     };

     const [user, setUser] = useState(initialState);

     const { email, password, passwordCheck, nickname } = user;

     //상태관리 위해 초기값 세팅
     const [emailInput, setEmailInput] = useState("");
     const [passInput, setPassInput] = useState("");
     const [passCheckInput, setPassCheckInput] = useState("");
     const [nicknameInput, setNicknameInput] = useState("");

     // //유효성 검사
     const onChangeUserHandler = (e) => {
          const { name, value } = e.target;
          setUser({ ...user, [name]: value });

          const regEmail =
               /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          if (name === "email")
               !regEmail.test(value) // test 함수 : 문자열이 정규식을 만족하는지 판별하는 변수 .test(검사할 문자)
                    ? setEmailInput("이메일 형식으로 입력해주세요.") // 칸이 채워지면 이 내용이 하단에 뜸
                    : setEmailInput("");
          const regPassword =
               /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d@$!%*#?&]{8,16}$/;
          if (name === "password")
               !regPassword.test(value)
                    ? setPassInput(
                           `영문 대,소문자와 숫자 조합의 8-16자의 비밀번호를 설정해주세요.
                           특수문자(!@#$%^&*)도 사용 가능합니다.`
                      )
                    : setPassInput("");
          const regNickname = /^[ㄱ-ㅎ|가-힣]{2,6}$/;
          if (name === "nickname")
               !regNickname.test(value)
                    ? setNicknameInput(
                           "닉네임은 2-6자의 한글만 입력 가능합니다."
                      )
                    : setNicknameInput("");
          if (name === "valiPass")
               password !== value
                    ? setPassCheckInput("비밀번호가 불일치합니다")
                    : setPassCheckInput("");
     };

     const [isChecked, setIsChecked] = useState(false);
     const onSubmitUserHandler = (e) => {
          e.preventDefault();
          if (
               email.trim() === "" ||
               password.trim() === "" ||
               passwordCheck === "" ||
               nickname.trim() === ""
          ) {
               return alert("아이디랑 비밀번호를 입력해주세요!");
          }
          if (!isChecked) {
               return alert("아이디 중복확인을 해주세요!");
          }
          if (isChecked) {
               dispatch(__posttUser(user));
          }
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
                         <button type="button">중복확인</button>
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
                         <button type="button">중복확인</button>
                    </div>
                    <p id="help-nick" className="help">
                         {nicknameInput}
                    </p>

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
          width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
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
                    width: 55%;
                    padding: 15px;
                    border: none;
                    border-bottom: 2px solid #444;
               }
               button {
                    width: 17%;
                    padding: 10px;
                    font-weight: 600;
                    border: none;
                    border: 2px solid var(--color-midtone);
                    color: var(--color-darktext);
                    background-color: transparent;
                    cursor: pointer;
               }
               button:hover {
                    background-color: var(--color-darktext);
                    color: #fff;
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
               width: 400px;
               height: 40px;
               margin-left: 90px;
               font-size: 12px;
               color: var(--color-midtone);
          }
     }
`;
