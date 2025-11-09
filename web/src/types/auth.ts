export interface User {
  serial: number;
  name: string;
  username: string;
  email: string;
  created_at: string;
}

export interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
 