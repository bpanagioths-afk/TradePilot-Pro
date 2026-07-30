import api from "../api/api";


export async function loadMarketAlerts(params = {}) {
    const response = await api.get(
        "/market-alerts",
        {
            params
        }
    );

    return response.data;
}
