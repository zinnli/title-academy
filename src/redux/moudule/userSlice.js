import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const initialState = {
  user: [
    {
      //  id: 0,
      email: "",
      password: "",
      //  passwordConfirm: "",
      nickname: "",
    },
  ],
  isLoading: false,
  error: null,
};

export const __posttUser = createAsyncThunk(
  "user/signup",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/signup", payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__posttUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__posttUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user.push(action.payload);
    },
    [__posttUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
