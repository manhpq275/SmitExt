import { RootState } from "index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MemberMngmtRepository from "../../../data/repositories/MemberMngmtRepository";

export namespace MemberMngmtSliceModule {
  export const getAllMembers: any = createAsyncThunk(
    "membermngmt/getallMember",
    async () => {
      const memberMngmtRepo = new MemberMngmtRepository();
      return memberMngmtRepo.getAllMembers();
    }
  );

  export const memberManagementSlice = createSlice({
    name: "member-management",
    initialState: {
      listMembers: [],
      loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      // GET ALL MEMBER
      builder.addCase(getAllMembers.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getAllMembers.rejected, (state, action) => {
        state.loading = false;
      });
      builder.addCase(getAllMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.listMembers = action.payload.data.map((item: any) => ({
          key: item.id,
          ...item,
        }));
      });
    },
  });

  export const getLoadingSelector = (state: RootState) =>
    state.memberMngmtReducer.loading;
  export const getListMembersSelector = (state: RootState) =>
    state.memberMngmtReducer.listMembers;
}
