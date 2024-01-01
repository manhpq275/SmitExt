import { configureStore } from "@reduxjs/toolkit";
import { AuthSliceModule } from "pages/_redux/auth";
import { MemberMngmtSliceModule } from "../member-management";
import { UserManagementSliceModule } from "../user-management";

export const store = configureStore({
  reducer: {
    authReducer: AuthSliceModule.authSlice.reducer,
    userMngmtReducer: UserManagementSliceModule.userManagementSlice.reducer,
    memberMngmtReducer: MemberMngmtSliceModule.memberManagementSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
