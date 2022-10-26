import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import titleImage from "../../img/title.png";
import PostList from "../Post/PostList";

function Header() {
  const loginCheck = useSelector((state) => state.userList.isLogin);
  console.log(loginCheck);
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState("");

  useEffect(() => {
    const userinfomation = JSON.parse(sessionStorage.getItem("userinfo"));
    setUserinfo(userinfomation);
  }, [loginCheck]);

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
        {userinfo ? (
          <p>{userinfo.nickname}님 안녕하세요!</p>
        ) : (
          <p>로그인 후 이용하세요!</p>
        )}
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
        {/* <button onClick={logOut}>로그아웃</button> */}
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
  div {
    display: flex;
    padding: 10px 30px;
    font-weight: 700;
    font-size: 20px;
    button {
      width: fit-content;
      padding: 0 14px;
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
