import { configureStore } from "@reduxjs/toolkit";
import user from "../moudule/userSlice";

const store = configureStore({
     reducer: { user: user },
});

export default store;
