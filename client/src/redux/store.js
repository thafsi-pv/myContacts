import { configureStore } from "@reduxjs/toolkit";
import userPermissionSlice from "./userPermissionSlice";

const store = configureStore({
  reducer: { permission: userPermissionSlice },
});

export default store;
