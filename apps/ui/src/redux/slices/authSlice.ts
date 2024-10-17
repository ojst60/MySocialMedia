import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define the authentication state interface
interface AuthState {
  loggedIn: boolean;
  username: string;
  id: string;
}

// Set the initial state for authentication
const initialState: AuthState = {
  loggedIn: false,
  username: "",
  id: "",
};

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to handle user login
    login: (state, action: PayloadAction<{ username: string; id: string }>) => {
      state.loggedIn = true;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    // Action to handle user logout
    logout: (state) => {
      state.loggedIn = false;
      state.username = "";
      state.id = "";
    },
  },
});

// create some reducers and export actions

export const getAuthInfo = (state: RootState) => state.auth;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
