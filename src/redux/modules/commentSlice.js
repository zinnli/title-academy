import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const initialState = { commentList: [] };

//코멘트 GET요청
export const _getCommentList = createAsyncThunk(
     "getCommentList",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.get(
                    `/api/post/${payload}/comment`,
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

//코멘트 POST요청
export const _postComment = createAsyncThunk(
     "postComment",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.post(
                    `/api/post/${payload.postId}/comment`,
                    payload,
                    {
                         headers: {
                              Access_Token:
                                   sessionStorage.getItem("access_token"),
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

//코멘트 DELETE요청
export const _deleteComment = createAsyncThunk(
     "deleteComment",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.delete(
                    `/api/post/${payload.postId}/comment/${payload.commentId}`,
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

//코멘트 PUT요청
export const _putcomment = createAsyncThunk(
     "putcomment",
     async (payload, thunkAPI) => {
          try {
               const data = await axiosInstance.put(
                    `/api/post/${payload.postId}/comment/${payload.commentId}`,
                    payload.editComment,
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

const commnetList = createSlice({
     name: "commentSlice",
     initialState,
     extraReducers: (builder) => {
          builder
               //댓글입력
               .addCase(_postComment.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(_postComment.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.commentList = action.payload;
               })
               .addCase(_postComment.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
               })
               //댓글조회
               .addCase(_getCommentList.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(_getCommentList.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.commentList = action.payload;
               })
               .addCase(_getCommentList.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
               })
               //댓글삭제
               .addCase(_deleteComment.fulfilled, (state, action) => {
                    state.commentList = action.payload;
               })
               //코멘트 PUT요청 시 상태에 따른 처리
               .addCase(_putcomment.pending, (state) => {
                    state.isLoading = true;
               })
               .addCase(_putcomment.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.commentList = action.payload;
               })
               .addCase(_putcomment.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
               });
     },
});

export const { addCommnet } = commnetList.actions;
export default commnetList.reducer;
