export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface UserResponse {
    id: number;
    name: string;
    username: string;
    email: string;
    created_at: Date;
}

export interface SignupRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: UserResponse;
    token: string;
}