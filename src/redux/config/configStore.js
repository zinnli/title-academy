import { configureStore } from "@reduxjs/toolkit";
import postList from "../modules/postSlice";
import commentList from "../modules/commentSlice";
import userList from "../moudule/userSlice";
import detailPost from "../modules/detailPostSlice";

const store = configureStore({
  reducer: { postList, commentList, userList, detailPost },
});

export default store;
