import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services";

// Định nghĩa createAsyncThunk cho đăng nhập
export const loginAsync = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string}, thunkAPI) => {
      try {
        const user = await userService.login(email, password);
        return user;
      } catch (error) {
        console.log(error)
        return error;
      }
    }
  );
  
  // Định nghĩa createAsyncThunk cho đăng xuất
  export const logoutAsync = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    try {
      userService.logout();
    } catch (error) {
      throw error;
    }
  });