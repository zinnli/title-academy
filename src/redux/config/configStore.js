import { configureStore } from "@reduxjs/toolkit";
import postList from "../modules/postSlice";
import commentList from "../modules/commentSlice";

const store = configureStore({
     reducer: { postList, commentList },
});

export default store;
