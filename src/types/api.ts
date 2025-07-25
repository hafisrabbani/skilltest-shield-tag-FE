export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface ApiError {
    status: string;
    message: string;
}

export interface Login{
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

export interface Register {
    email: string;
    password: string;
    confirmPassword: string;
}