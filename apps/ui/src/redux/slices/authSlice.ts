import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  loggedIn: boolean;
  username: string;
  displayName: string;
}

const initialState: AuthState = {
  loggedIn: false,
  username: "ojst01",
  displayName: "Julius Oyovwikigho",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// create some reducers and export actions

export const getAuthInfo = (state: RootState) => state.auth;

export default authSlice.reducer;
