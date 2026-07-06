import { useEffect, useState } from "react";
import { getPortfolioOverview } from "../../../services/portfolioService";

export default function usePortfolio() {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadPortfolio() {
            try {
                setLoading(true);
                setError(false);

                const data = await getPortfolioOverview();
                setPortfolio(data);
            } catch (error) {
                console.error("Portfolio overview error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadPortfolio();
    }, []);

    return {
        portfolio,
        loading,
        error
    };
}