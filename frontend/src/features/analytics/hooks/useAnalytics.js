import { useCallback, useEffect, useState } from "react";

import analyticsService from "../../../services/analyticsService";

const INITIAL_STATE = {
    pairs: [],
    hours: [],
    systems: [],
    psychology: [],
    summary: null,
    performance: null,
    risk: null,
    equity: null,
    drawdown: null,
    equityCurve: [],
    drawdownCurve: [],
};

export default function useAnalytics() {
    const [analytics, setAnalytics] = useState(INITIAL_STATE);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const loadAnalytics = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const data = await analyticsService.getAll();

            setAnalytics(data);
        } catch (err) {
            console.error("Analytics loading error:", err);
            setAnalytics(INITIAL_STATE);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAnalytics();
    }, [loadAnalytics]);

    return {
        analytics,
        loading,
        error,
        refresh: loadAnalytics,
    };
}