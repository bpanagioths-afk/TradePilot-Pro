import api from "../api/api";

export async function getPortfolioSummary() {
    const response = await api.get("/portfolio/summary");
    return response.data;
}

export async function getPortfolioOverview() {
    const response = await api.get("/portfolio/overview");
    return response.data;
}