import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../shared/request";
const access_token = sessionStorage.getItem("access_token");
const refresh_token = sessionStorage.getItem("refresh_token");
const initialState = { postList: [] };

export const _postPost = createAsyncThunk(
  "postPost",
  async (payload, thunkAPI) => {
    console.log("페이로드", payload);
    try {
      const data = await axiosInstance.post("/api/post", payload, {
        headers: { Access_Token: access_token, Refresh_Token: refresh_token },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const _patchPost = createAsyncThunk(
  "patchPost",
  async (payload, thunkAPI) => {
    try {
      console.log("패치 페이로드", payload);
      const data = await axios.patch(
        `http://localhost:3001/postList/${payload.params}`,
        payload.modifyState
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _deletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `http://localhost:3001/postList/${payload}`
      );
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
      .addCase(_postPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_postPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList.push(action.payload);
      })
      .addCase(_postPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(_getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList = action.payload;
        console.log(current(state));
      })
      .addCase(_getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addPost } = postList.actions;
export default postList.reducer;
