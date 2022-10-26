import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { _getPost } from "../../redux/modules/postSlice";

function Post({ post }) {
     return (
          <>
               <PostWrap>
                    <img src={post.imgUrl} alt="main-img" />
                    <PostTitle>{post.content}</PostTitle>
               </PostWrap>
          </>
     );
}

export default Post;
const PostWrap = styled.div`
     width: 340px;
     height: 450px;
     padding: 40px 40px;
     border: 2px solid var(--color-primary);
     border-radius: 5px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     align-items: center;
     img {
          object-fit: cover;
          width: 260px;
          height: 260px;
          background-color: #fff;
          border: 1px solid var(--color-primary);
     }
     &:hover {
          border: 3px solid var(--color-primary);
          box-shadow: 3px 3px 10px 5px var(--color-primary);
     }
`;

const PostTitle = styled.div`
     height: 80px;
     width: 260px;
     margin-top: 10px;
     padding: 10px;
     border-top: 2px solid var(--color-primary);
`;
