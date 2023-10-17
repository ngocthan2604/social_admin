// user.service.ts
import env from 'react-dotenv';
import configureAppStore from '../store/index';

// Định nghĩa hàm để thực hiện yêu cầu đăng nhập
async function login(email: string, password: string) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(`${env.API_URL}/api/v1/auth`, requestOptions);
    if (!response.ok) {
      if(response.status === 401){
          logout();
      }
    }
    const user = await response.json();
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
}

// Định nghĩa hàm để thực hiện đăng kí
async function  register(firstname:string,lastname:string,email:string,repeatpassword:string) {
  const requestOptions = {
    method:'POST',
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      first_name:firstname,
      last_name:lastname, 
      email:email,
      password:repeatpassword 
    }),
  }
  
  try{
    const response = await fetch(`${env.API_URL}/api/v1/users`, requestOptions);
    const user = await response.json();
    return user;
  }catch(error){
    throw error;
  }
}

// Định nghĩa hàm để thực hiện yêu cầu đăng xuất
function logout() {
  sessionStorage.removeItem('user');
}

// Định nghĩa hàm để get Current User
async function currentUser(){
  const userJson = sessionStorage.getItem('user');
  if(userJson){
    var user = JSON.parse(userJson);
  }
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': user.token, 
    },
  };

  try {
    const response = await fetch(`${env.API_URL}/api/v1/auth`, requestOptions);
    return await response.json();
  } catch (error) {
    throw error;
  }

}

export const userService = { login,register, logout,currentUser };
