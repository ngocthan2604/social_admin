// user.service.ts
import env from 'react-dotenv';

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

// Định nghĩa hàm để thực hiện yêu cầu đăng xuất
function logout() {
  sessionStorage.removeItem('user');
}

export const userService = { login, logout };
