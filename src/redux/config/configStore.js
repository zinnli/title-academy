import { configureStore } from "@reduxjs/toolkit";
import postList from "../modules/postSlice";
import commentList from "../modules/commentSlice";
import user from "../modules/userSlice";

const store = configureStore({
     reducer: { postList, commentList, user },
});

export default store;
