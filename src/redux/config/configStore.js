import { configureStore } from "@reduxjs/toolkit";
import postList from "../modules/postSlice";
import commentList from "../modules/commentSlice";
import detailPost from "../modules/detailPostSlice";
import userList from "../modules/userSlice";

const store = configureStore({
  reducer: { postList, commentList, userList, detailPost },
});

export default store;
