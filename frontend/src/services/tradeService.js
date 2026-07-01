import api from "../api/api";

export function getTrades() {
    return api.get("/trades/");
}

export function createTrade(payload) {
    return api.post("/trades/", payload);
}

export function updateTrade(tradeId, payload) {
    return api.put(`/trades/${tradeId}`, payload);
}

export function deleteTrade(tradeId) {
    return api.delete(`/trades/${tradeId}`);
}

export function uploadTradeScreenshot(tradeId, formData) {
    return api.post(
        `/trades/${tradeId}/screenshot`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
}