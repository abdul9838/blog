import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout(state, action) {
      localStorage.removeItem("account");
      state.userInfo = null;
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
