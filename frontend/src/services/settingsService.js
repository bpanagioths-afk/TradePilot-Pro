import api from "../api/api";


export async function loadSettings() {
    const response = await api.get("/settings");

    return response.data;
}


export async function updateSettings(settingsData) {
    const response = await api.put(
        "/settings",
        settingsData
    );

    return response.data;
}