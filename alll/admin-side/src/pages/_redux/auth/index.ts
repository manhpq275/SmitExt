import { RootState } from "index";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthRepository from "data/repositories/AuthRepository";

export namespace AuthSliceModule {
  export const login: any = createAsyncThunk(
    "users/login",
    async (userInfo: any, thunkAPI) => {
      const authAdminRepo = new AuthRepository();
      return authAdminRepo.login(userInfo);
    }
  );

  export const logout: any = createAsyncThunk(
    "users/logout",
    async (userInfo: any, thunkAPI) => {
      const authAdminRepo = new AuthRepository();
      return authAdminRepo.logout();
    }
  );

  export const authSlice = createSlice({
    name: "auth-module",
    initialState: {
      user: null,
      role: null,
      isAuth: false,
    },
    reducers: {
      setAuth: (state, action) => {
        console.log(action);
        
        if (action.payload?.success && action.payload.data.role === 'admin') {
          state.isAuth = true;
          state.user = action.payload.data;
          state.role = action.payload.data.role || "member";
        } else {
          state.isAuth = false;
        }
      },
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state, action) => { });
      builder.addCase(login.rejected, (state, action) => {
        state.isAuth = false;
        toast(action.error.message, { type: "error" });
      });
      builder.addCase(login.fulfilled, (state: any, action) => {
        if (action.payload.data.role ==='admin') {
          state.isAuth = true;
          state.user = action.payload.data;
          state.role = action.payload.data.role || "member";
          toast(`Wellcome ${state.user.displayName}`, { type: "success" });
          const accessToken = action.payload.data.accessToken;
          localStorage.setItem("jwt", accessToken);
        } else {
          toast(`unauthorized`, { type: "error" });
        }
      });

      builder.addCase(logout.rejected, (state, action) => {
        state.isAuth = false;
        localStorage.removeItem("jwt");
      });
      builder.addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isAuth = false;
        localStorage.removeItem("jwt");
      });
    },
  });

  export const { setAuth } = authSlice.actions;

  export const getUserSelector = (state: RootState) => state.authReducer.user;
  export const getAuthSelector = (state: RootState) => state.authReducer.isAuth;
  export const getUserRoleSelector = (state: RootState) =>
    state.authReducer.role;
}
