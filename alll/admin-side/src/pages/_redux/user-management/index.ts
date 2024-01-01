import { RootState } from "index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserMngmtRepository from "data/repositories/UserMngmtRepository";

export namespace UserManagementSliceModule {
  export const getAllUsers: any = createAsyncThunk(
    "usermngm/getall",
    async () => {
      const userMngmtRepo = new UserMngmtRepository();
      return userMngmtRepo.getAllUsers();
    }
  );

  export const uploadResourceFile: any = createAsyncThunk(
    "usermngm/uploadResourceFile",
    async (file: FormData) => {
      const userMngmtRepo = new UserMngmtRepository();
      return userMngmtRepo.uploadResourceFile(file);
    }
  );

  export const userManagementSlice = createSlice({
    name: "user-management",
    initialState: {
      listUsers: [],
      loading: false,
      uploadResourceFileLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      // GET ALL USER
      builder.addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
      });
      builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.listUsers = action.payload.data.map((item: any) => ({
          key: item.id,
          ...item,
        }));
      });

      // GET ALL USER
      builder.addCase(uploadResourceFile.pending, (state, action) => {
        state.uploadResourceFileLoading = true;
      });
      builder.addCase(uploadResourceFile.rejected, (state, action) => {
        state.uploadResourceFileLoading = false;
      });
      builder.addCase(uploadResourceFile.fulfilled, (state, action) => {
        state.uploadResourceFileLoading = false;
      });
    },
  });

  export const getLoadingSelector = (state: RootState) =>
    state.userMngmtReducer.loading;
  export const getListUsersSelector = (state: RootState) =>
    state.userMngmtReducer.listUsers;

  export const getUploadLoadingSelector = (state: RootState) =>
    state.userMngmtReducer.uploadResourceFileLoading;
}
