import styled from "styled-components";

function Header() {
  return (
    <STHeader>
      <div>제목학원</div>
      <div>
        <button>글쓰기</button>
        <button>로그아웃</button>
      </div>
    </STHeader>
  );
}

export default Header;

const STHeader = styled.div`
  width: 100%;
  height: 60px;
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
    gap: 10px;
    padding: 10px 30px;
    font-weight: 700;
    font-size: 20px;
    button {
      width: fit-content;
      padding: 5px 10px;
      font-weight: 700;
      font-size: 15px;
    }
  }
`;
