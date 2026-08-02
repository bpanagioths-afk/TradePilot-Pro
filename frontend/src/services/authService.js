import api from "../api/api";


const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";


export async function register({
    username,
    email,
    password
}) {
    const response = await api.post(
        "/auth/register",
        {
            username,
            email,
            password
        }
    );

    return response.data;
}


export async function login(
    usernameOrEmail,
    password
) {
    const response = await api.post(
        "/auth/login",
        {
            username_or_email: usernameOrEmail,
            password
        }
    );

    const {
        access_token: accessToken,
        user
    } = response.data;

    if (!accessToken) {
        throw new Error(
            "Το backend δεν επέστρεψε access token."
        );
    }

    localStorage.setItem(
        ACCESS_TOKEN_KEY,
        accessToken
    );

    if (user) {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user)
        );
    }

    return response.data;
}


export async function loadCurrentUser() {
    const response = await api.get("/auth/me");

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(response.data)
    );

    return response.data;
}


export function logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}


export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}


export function isAuthenticated() {
    return Boolean(getAccessToken());
}


export function getStoredUser() {
    const storedUser =
        localStorage.getItem(USER_KEY);

    if (!storedUser) {
        return null;
    }

    try {
        return JSON.parse(storedUser);
    } catch {
        localStorage.removeItem(USER_KEY);
        return null;
    }
}


export async function forgotUsername(email) {
    const response = await api.post(
        "/auth/forgot-username",
        { email }
    );

    return response.data;
}


export async function forgotPassword(
    usernameOrEmail
) {
    const response = await api.post(
        "/auth/forgot-password",
        {
            username_or_email: usernameOrEmail
        }
    );

    return response.data;
}


export async function resetPassword(
    token,
    newPassword
) {
    const response = await api.post(
        "/auth/reset-password",
        {
            token,
            new_password: newPassword
        }
    );

    return response.data;
}


export async function changePassword(
    currentPassword,
    newPassword,
    confirmNewPassword
) {
    const response = await api.post(
        "/auth/change-password",
        {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_new_password:
                confirmNewPassword
        }
    );

    return response.data;
}