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
        return error;
      }
    }
  );

  // Định nghĩa hàm register
  export const registerAsync = createAsyncThunk(
    'user/register',
    async({firstname,lastname,email,repeatpassword}:{firstname:string,lastname:string,email:string,repeatpassword:string},thunkAPI) =>{
      try{
        const user = await userService.register(firstname,lastname,email,repeatpassword);
        return user;
      }catch(error){
        return error;
      }
    }
  )
  
  // Định nghĩa createAsyncThunk cho đăng xuất
  export const logoutAsync = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    try {
      userService.logout();
    } catch (error) {
      throw error;
    }
  });

  // Định nghĩa hàm khi login lấy current user 
  export const currentUserAsync = createAsyncThunk(
    'user/currentUser',
    async (_, thunkAPI) => {
      try {
        const user = await userService.currentUser();
        return user;
      } catch (error) {
        return error;
      }
    }
  );