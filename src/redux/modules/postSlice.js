import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const initialState = { postList: [] };

//상세 게시물 POST요청
export const _postPost = createAsyncThunk(
     "postPost",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.post("/api/post", payload, {
                    headers: {
                         Access_Token: sessionStorage.getItem("access_token"),
                         Refresh_Token: sessionStorage.getItem("refresh_token"),
                    },
               });
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

//전체 게시물 GET요청
export const _getPost = createAsyncThunk(
     "getPost",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.get("/api/post");
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

const postList = createSlice({
     name: "postList",
     initialState,
     extraReducers: (builder) => {
          builder

               //전체 게시물 조회 전역변수 생성
               .addCase(_getPost.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(_getPost.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.postList = action.payload;
               })
               .addCase(_getPost.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
               });
     },
});

export const { addPost } = postList.actions;
export default postList.reducer;
