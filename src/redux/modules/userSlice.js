import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../shared/request";
import axios from "axios";

const initialState = {
     user: [
          {
               email: "",
               password: "",
               nickname: "",
          },
     ],
     isLoading: false,
     error: null,
};

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
                         //console.log(res.headers.refresh_token);
                    });
               return thunkAPI.fulfillWithValue(data.data);
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
          [__postUser.pending]: (state) => {
               state.isLoading = true;
          },
          [__postUser.fulfilled]: (state, action) => {
               state.isLoading = false;
               alert("완료");
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
               console.log(action.payload);
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

export default userSlice.reducer;
