const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
  token: string;
}

export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    const errorObj = new Error(error.message || "Signup failed") as any;
    errorObj.response = { data: error };
    throw errorObj;
  }

  const result = await response.json();
  localStorage.setItem("token", result.token);
  return result;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    const errorObj = new Error(error.message || "Login failed") as any;
    errorObj.response = { data: error };
    throw errorObj;
  }

  const result = await response.json();
  localStorage.setItem("token", result.token);
  return result;
};

export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem("token");
    throw new Error("Failed to get current user");
  }

  return response.json();
};