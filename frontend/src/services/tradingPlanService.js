import api from "../api/api";

export function getTradingPlans() {
    return api.get("/trading-plans/");
}

export function createTradingPlan(payload) {
    return api.post("/trading-plans/", payload);
}

export function updateTradingPlan(planId, payload) {
    return api.put(`/trading-plans/${planId}`, payload);
}

export function deleteTradingPlan(planId) {
    return api.delete(`/trading-plans/${planId}`);
}