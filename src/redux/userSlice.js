import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    token: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.token = action.payload.access_token;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.token = null;
      state.loading = false;
    },
    register: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, register, setLoading, updateUserInfo } =
  userSlice.actions;
export default userSlice.reducer;
