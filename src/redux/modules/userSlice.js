import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";

const initialState = {
     userList: [
          {
               email: "",
               password: "",
               nickname: "",
          },
     ],
     isLoading: false,
     error: null,
     isLogin: false,
};

//회원가입 POST요청
export const __postUser = createAsyncThunk(
     "signup",
     async (payload, thunkAPI) => {
          try {
               const { data } = await axiosInstance.post(
                    "/api/auth/signup",
                    payload
               );
               return thunkAPI.fulfillWithValue(data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

//로그인 POST요청
export const __postLogin = createAsyncThunk(
     "login",
     async (payload, thunkAPI) => {
          try {
               const { data } = await axiosInstance
                    .post("/api/auth/login", payload)
                    .then((res) => {
                         sessionStorage.setItem(
                              "access_token",
                              res.headers.access_token
                         );
                         sessionStorage.setItem(
                              "refresh_token",
                              res.headers.refresh_token
                         );
                         return res;
                    });
               return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {
               return thunkAPI.rejectWithValue(error);
          }
     }
);

const userList = createSlice({
     name: "userList",
     initialState,
     reducers: {},
     extraReducers: {
          //post
          [__postUser.pending]: (state) => {
               state.isLoading = true;
          },
          [__postUser.fulfilled]: (state, action) => {
               state.isLoading = false;
               alert("가입이 완료 되셨습니다!");
          },
          [__postUser.rejected]: (state, action) => {
               state.isLoading = false;
               state.error = action.payload;
          }, //post
          [__postLogin.pending]: (state) => {
               state.isLoading = true;
          },
          [__postLogin.fulfilled]: (state, action) => {
               state.isLoading = false;
               state.isLogin = true;
               sessionStorage.setItem(
                    "userinfo",
                    JSON.stringify(action.payload)
               );
          },
          [__postLogin.rejected]: (state, action) => {
               state.isLoading = false;
               state.error = action.payload;
          },
     },
});

export default userList.reducer;
