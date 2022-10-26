import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../shared/request";

const initialState = { commentList: [] };

export const _getCommentList = createAsyncThunk(
  "getCommentList",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.get(`/api/post/${payload}/comment`);

      console.log("tests", data.data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _postComment = createAsyncThunk(
  "postComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.post(
        `/api/post/${payload.postId}/comment`,
        payload,
        {
          headers: {
            Access_Token: sessionStorage.getItem("access_token"),
            Refresh_Token: sessionStorage.getItem("refresh_token"),
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

export const _deleteComment = createAsyncThunk(
  "deleteComment",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.delete(
        `/api/post/${payload.postId}/comment/${payload.id}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _putcomment = createAsyncThunk(
  "putcomment",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.put(
        `/api/post/${payload.postId}/comment/${payload.commentId}`,
        payload.editComment,
        {
          headers: {
            Access_Token: sessionStorage.getItem("refresh_token"),
            Refresh_Token: sessionStorage.getItem("refresh_token"),
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
      .addCase(_postComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_postComment.fulfilled, (state, action) => {
        // state.isLoading = false;
        console.log(current(state));
        console.log(action.payload);
        state.commentList = action.payload;
      })
      .addCase(_postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(_getCommentList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_getCommentList.fulfilled, (state, action) => {
        console.log("리스트:", action.payload);
        state.isLoading = false;
        state.commentList = action.payload;
      })
      .addCase(_getCommentList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //수정하기 전역변수 리듀서
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
