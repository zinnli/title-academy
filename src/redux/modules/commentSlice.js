import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const initialState = { commentList: [] };

//댓글 조회
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
               //console.log("tests", data.data.data);
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

//댓글입력
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
               //  console.log("testss", data.data.data);
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);
//댓글삭제
export const _deleteComment = createAsyncThunk(
     "deleteComment",
     async (payload, thunkAPI) => {
          try {
               console.log("check:", payload);
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

               console.log("check:", payload.postId);
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
               });
     },
});

export const { addCommnet } = commnetList.actions;
export default commnetList.reducer;
