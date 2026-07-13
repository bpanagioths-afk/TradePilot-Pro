import api from "../api/api";

const analyticsService = {
    async getPairs() {
        const { data } = await api.get("/dashboard/pairs");
        return data;
    },

    async getHours() {
        const { data } = await api.get("/dashboard/hours");
        return data;
    },

    async getSystems() {
        const { data } = await api.get("/dashboard/systems");
        return data;
    },

    async getPsychology() {
        const { data } = await api.get("/dashboard/psychology");
        return data;
    },

    async getPortfolioOverview() {
        const { data } = await api.get("/api/portfolio/overview");
        return data;
    },

    async getAll() {
        const [
            pairs,
            hours,
            systems,
            psychology,
            portfolio
        ] = await Promise.all([
            this.getPairs(),
            this.getHours(),
            this.getSystems(),
            this.getPsychology(),
            this.getPortfolioOverview()
        ]);

        return {
            pairs,
            hours,
            systems,
            psychology,
            summary: portfolio.summary,
            performance: portfolio.performance,
            risk: portfolio.risk,
            equity: portfolio.equity,
            drawdown: portfolio.drawdown,
            equityCurve: portfolio.equity?.equity_curve ?? [],
            drawdownCurve: portfolio.drawdown?.drawdown_curve ?? [],
        };
    }
};

export default analyticsService;