import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const access_token = sessionStorage.getItem("access_token");
const refresh_token = sessionStorage.getItem("refresh_token");
const initialState = { detailPost: [] };

export const _getDetailPost = createAsyncThunk(
  "getDetailPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.get(`/api/post/${payload}`, {
        headers: { Access_Token: access_token, Refresh_Token: refresh_token },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _deleteDetailPost = createAsyncThunk(
  "deleteDetailPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance.delete(`/api/post/${payload}`, {
        headers: { Access_Token: access_token, Refresh_Token: refresh_token },
      });

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
          headers: { Access_Token: access_token, Refresh_Token: refresh_token },
        }
      );
      return thunkAPI.fulfillWithValue(data.data);
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
      .addCase(_getDetailPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(_getDetailPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailPost = action.payload;
      })
      .addCase(_getDetailPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addDetailPost } = detailPost.actions;
export default detailPost.reducer;
