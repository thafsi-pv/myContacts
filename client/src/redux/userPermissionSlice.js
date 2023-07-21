import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "userPermission",
  initialState: {
    role: "",
    permissionList: [],
  },
  reducers: {
    addRole: (state, action) => {
      state.role = action.payload;
    },
    addPermission: (state, action) => {
      state.permissionList = action.payload;
    },
  },
});

export const { addRole, addPermission } = permissionSlice.actions;
export default permissionSlice.reducer;
