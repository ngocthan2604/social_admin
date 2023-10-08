export interface AuthenticateUser {
    _id:string;
    first_name:string;
    last_name:string;
    email:string;
    avatar:string;
}

export interface AccountState {
    user:AuthenticateUser | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

