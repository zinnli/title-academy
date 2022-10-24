import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { commentList: [] };

export const _postComment = createAsyncThunk(
  "postComment",
  async (payload, thunkAPI) => {
    console.log("코멘트페이로드", payload);
    try {
      const data = await axios.post(
        "http://localhost:3001/commentList",
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const _getCommentList = createAsyncThunk(
  "getCommentList",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/commentList");

      const realdata = data.data.filter((comment) => {
        return comment.postId == payload;
      });
      console.log("데이터", realdata);
      return thunkAPI.fulfillWithValue(realdata);
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
        state.isLoading = false;
        state.commentList.push(action.payload);
        console.log(current(state));
      })
      .addCase(_postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(_getCommentList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_getCommentList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentList = action.payload;
        console.log(current(state));
      })
      .addCase(_getCommentList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addCommnet } = commnetList.actions;
export default commnetList.reducer;
