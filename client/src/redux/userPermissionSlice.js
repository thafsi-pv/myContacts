import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "userPermission",
  initialState: {
    userDetails: {},
    permissionList: [],
  },
  reducers: {
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    addPermission: (state, action) => {
      state.permissionList = action.payload;
    },
  },
});

export const { addUserDetails, addPermission } = permissionSlice.actions;
export default permissionSlice.reducer;
