import api from "../api/api";

export function evaluateTrade(tradeId) {
    return api.get(`/rule-engine/trade/${tradeId}`);
}