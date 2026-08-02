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


export async function exportSettingsBackup() {
    const response = await api.get(
        "/settings/backup"
    );

    return response.data;
}


export async function previewSettingsBackup(
    backupData
) {
    const response = await api.post(
        "/settings/backup/preview",
        {
            mode: "merge",
            backup: backupData,
        }
    );

    return response.data;
}


export async function importSettingsBackup(
    backupData
) {
    const response = await api.post(
        "/settings/backup/import",
        {
            mode: "merge",
            backup: backupData,
        }
    );

    return response.data;
}
