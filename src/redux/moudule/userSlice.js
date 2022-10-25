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
      const { data } = await axiosInstance.post("/api/auth/signup", payload, {
        "Content-Type": "application/json",
      });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const _postLogin = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    try {
      const data = await axiosInstance
        .post("/api/auth/login", payload)
        .then((res) => {
          sessionStorage.setItem("access_token", res.headers.access_token);
          sessionStorage.setItem("refresh_token", res.headers.refresh_token);
          return res;
        });
      console.log(data.data.data);
      return thunkAPI.fulfillWithValue(data.data.data);
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
    [_postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [_postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      sessionStorage.setItem("userinfo", JSON.stringify(action.payload));
    },
    [_postLogin.rejected]: (state, action) => {
      state.isLoading = false;

      alert("로그인에 실패하였습니다.");
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
