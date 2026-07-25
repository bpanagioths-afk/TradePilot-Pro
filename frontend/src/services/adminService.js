import api from "../api/api";


export async function getAdminUsers() {
    const response = await api.get("/admin/users");
    return response.data;
}


export async function createAdminUser(userData) {
    const response = await api.post("/admin/users", userData);
    return response.data;
}


export async function updateAdminUser(userId, userData) {
    const response = await api.put(
        `/admin/users/${userId}`,
        userData
    );

    return response.data;
}


export async function resetAdminUserPassword(
    userId,
    password
) {
    const response = await api.post(
        `/admin/users/${userId}/reset-password`,
        { password }
    );

    return response.data;
}


export async function deleteAdminUser(userId) {
    await api.delete(`/admin/users/${userId}`);
}
