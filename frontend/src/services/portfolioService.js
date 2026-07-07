import api from "../api/api";

export async function getPortfolioSummary() {
    const response = await api.get("/api/portfolio/overview");
    return response.data.summary;
}

export async function getPortfolioOverview() {
    const response = await api.get("/api/portfolio/overview");
    return response.data;
}