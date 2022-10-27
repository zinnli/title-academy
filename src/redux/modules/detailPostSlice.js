import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const initialState = { detailPost: [], like: "" };
// const userinfomation = JSON.parse(sessionStorage.getItem("userinfo"));

//게시물 조회
export const _getDetailPost = createAsyncThunk(
     "getDetailPost",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.get(`/api/post/${payload}`, {
                    headers: {
                         Access_Token: sessionStorage.getItem("refresh_token"),
                         Refresh_Token: sessionStorage.getItem("refresh_token"),
                    },
               });
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);
//게시물 삭제
export const _deleteDetailPost = createAsyncThunk(
     "deleteDetailPost",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.delete(`/api/post/${payload}`, {
                    headers: {
                         Access_Token: sessionStorage.getItem("refresh_token"),
                         Refresh_Token: sessionStorage.getItem("refresh_token"),
                    },
               });

               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);
//게시물 수정
export const _putPost = createAsyncThunk(
     "putPost",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.put(
                    `/api/post/${payload.params}`,
                    {
                         title: payload.modifyState.title,
                         content: payload.modifyState.content,
                    },
                    {
                         headers: {
                              Access_Token:
                                   sessionStorage.getItem("refresh_token"),
                              Refresh_Token:
                                   sessionStorage.getItem("refresh_token"),
                         },
                    }
               );
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

//좋아요 요청
export const _postLike = createAsyncThunk(
     "postLike",
     async (payload, thunkAPI) => {
          try {
               console.log(payload);
               const data = await axiosInstance.post(
                    "/api/post/like",
                    { postId: payload },
                    {
                         headers: {
                              Access_Token:
                                   sessionStorage.getItem("refresh_token"),
                              Refresh_Token:
                                   sessionStorage.getItem("refresh_token"),
                         },
                    }
               );

               return thunkAPI.fulfillWithValue(data.data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

const detailPost = createSlice({
     name: "detailPost",
     initialState,
     extraReducers: (builder) => {
          builder
               //게시물 전역변수 생성
               .addCase(_getDetailPost.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(_getDetailPost.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.detailPost = action.payload;
                    //console.log("최초", state.detailPost);
               })
               .addCase(_getDetailPost.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
               })
               //좋아요 전역변수
               .addCase(_postLike.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(_postLike.fulfilled, (state, action) => {
                    state.isLoading = false;

                    state.detailPost.data.likeCnt = action.payload.likeCnt;
                    state.detailPost.data.likeCheck = action.payload.likeCheck;
               })
               .addCase(_postLike.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
               });
     },
});

export const { addDetailPost } = detailPost.actions;
export default detailPost.reducer;
