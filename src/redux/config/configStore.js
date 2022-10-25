import { configureStore } from "@reduxjs/toolkit";
import postList from "../modules/postSlice";
import commentList from "../modules/commentSlice";
import userList from "../moudule/userSlice";

const store = configureStore({
  reducer: { postList, commentList, userList },
});

export default store;
