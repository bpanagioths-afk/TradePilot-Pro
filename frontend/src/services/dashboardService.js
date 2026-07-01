import api from "../api/api";

export function getFullDashboard() {
    return api.get("/dashboard/full");
}

export function getPairStats() {
    return api.get("/dashboard/pairs");
}

export function getHourStats() {
    return api.get("/dashboard/hours");
}

export function getSystemStats() {
    return api.get("/dashboard/systems");
}

export function getPsychologyStats() {
    return api.get("/dashboard/psychology");
}