import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import titleImage from "../../img/title.png";

function Header() {
     //로그인 체크 전역변수 불러오기
     const loginCheck = useSelector((state) => state.userList.isLogin);
     console.log(loginCheck);
     const navigate = useNavigate();
     const [userinfo, setUserinfo] = useState("");

     //로그인 체크 확인 시 세션스토리지에 저장된 유저정보 불러오기
     useEffect(() => {
          const userinfomation = JSON.parse(sessionStorage.getItem("userinfo"));
          setUserinfo(userinfomation);
     }, [loginCheck]);

     //세션스토리지의 토큰 및 유저정보 삭제
     const logOut = () => {
          sessionStorage.clear();
          window.location.reload();
     };
     return (
          <STHeader>
               <Link to="/main">
                    <TitleImg src={titleImage} alt="title" />
               </Link>
               <div>
                    <div className="userinfo">
                         {userinfo ? (
                              <p>{userinfo.nickname}님 안녕하세요!</p>
                         ) : (
                              <p>로그인 후 이용하세요!</p>
                         )}
                    </div>
                    <button
                         onClick={() => {
                              navigate("/write");
                         }}
                    >
                         글쓰기
                    </button>
                    {loginCheck ? (
                         <button onClick={logOut}>로그아웃</button>
                    ) : (
                         <button onClick={() => navigate("/")}>로그인</button>
                    )}
               </div>
          </STHeader>
     );
}

export default Header;

const STHeader = styled.div`
     width: 100%;
     height: 65px;
     display: flex;
     justify-content: center;
     align-items: center;
     position: fixed;
     top: 0;
     gap: 30%;
     border-bottom: 1px solid #333;
     background-color: #fff;
     .userinfo {
          color: var(--color-darktext);
          font-size: 19px;
     }
     div {
          display: flex;
          padding: 10px 30px;
          font-weight: 700;
          font-size: 18px;
          button {
               width: fit-content;
               padding: 3px 14px 0 0;
               font-weight: 800;
               font-size: 17px;
               background-color: #fff;
               border: none;
               color: var(--color-darktext);
               cursor: pointer;
          }
     }
`;

const TitleImg = styled.img`
     width: 100px;
`;
