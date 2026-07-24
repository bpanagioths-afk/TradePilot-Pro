import api from "./api";

export const getMT5Accounts = async () => {
    const response = await api.get("/mt5/accounts");
    return response.data;
};

export const createMT5Account = async (data) => {
    const response = await api.post("/mt5/accounts", data);
    return response.data;
};

export const updateMT5Account = async (accountId, data) => {
    const response = await api.put(`/mt5/accounts/${accountId}`, data);
    return response.data;
};

export const disableMT5Account = async (accountId) => {
    const response = await api.delete(`/mt5/accounts/${accountId}`);
    return response.data;
};

export const syncMT5Account = async (accountId) => {
    const response = await api.post(
        `/mt5/sync?account_id=${accountId}`
    );
    return response.data;
};

export const getMT5AccountSummary = async (accountId) => {
    const response = await api.get(
        `/mt5/accounts/${accountId}/summary`
    );
    return response.data;
};

export const getMT5OpenPositions = async (accountId) => {
    const response = await api.get(
        `/mt5/open-positions?account_id=${accountId}`
    );
    return response.data;
};

export const getMT5PendingOrders = async (accountId) => {
    const response = await api.get(
        `/mt5/pending-orders?account_id=${accountId}`
    );
    return response.data;
};

export const getMT5AccountHealth = async (accountId) => {
    const response = await api.get(
        `/mt5/account-health?account_id=${accountId}`
    );
    return response.data;
};

export const getMT5TodayPerformance = async (accountId) => {
    const response = await api.get(
        `/mt5/today-performance?account_id=${accountId}`
    );
    return response.data;
};

export const getMT5ConnectionHealth = async (accountId) => {
    const response = await api.get(
        `/mt5/connection-health?account_id=${accountId}`
    );
    return response.data;
};
