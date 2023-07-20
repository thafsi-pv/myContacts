import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "userPermission",
  initialState: {
    role: "admin",
    permissionList: ["AC"],
  },
  reducers: {
    addRole: (state, action) => {
      state.role = action.payload;
    },
    addPermission: (state, action) => {
      state.permissionList.push(action.payload);
    },
  },
});

export const { addRole, addPermission } = permissionSlice.actions;
export default permissionSlice.reducer;
