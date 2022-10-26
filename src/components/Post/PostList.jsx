import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { _getPost } from "../../redux/modules/postSlice";

import Post from "./Post";

function PostList() {
     const navigate = useNavigate();
     const { isLoading, error, postList } = useSelector(
          (state) => state.postList
     );

     const dispatch = useDispatch();
     useEffect(() => {
          dispatch(_getPost());
     }, [dispatch]);

     if (isLoading) {
          return <div> 로딩중 .... </div>;
     }
     if (error) {
          return <div>{error.message}</div>;
     }
     console.log("포스트컴포넌트", postList.data);
     return (
          <PostListWrap>
               {postList.data &&
                    postList.data.map((post) => {
                         return (
                              <div
                                   onClick={() =>
                                        navigate(`/detail/${post.id}`)
                                   }
                                   key={post.id}
                                   className="post-hover"
                              >
                                   <Post post={post} />
                              </div>
                         );
                    })}
          </PostListWrap>
     );
}

export default PostList;

const PostListWrap = styled.div`
     display: flex;
     flex-wrap: wrap;
     align-items: center;
     justify-content: flex-start;
     width: 1100px;
     height: 100%;
     min-height: 100vh;
     padding: 160px 0;
     gap: 60px 40px;
     div {
          cursor: pointer;
     }
     .post-hover:hover {
          transform: scale(1.04);
     }
`;
