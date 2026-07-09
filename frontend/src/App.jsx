import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";
import Psychology from "./pages/Psychology";
import Reports from "./pages/Reports";
import MT5 from "./pages/MT5";
import Settings from "./pages/Settings";
import TradingPlan from "./pages/TradingPlan";
import Portfolio from "./pages/Portfolio";

function App() {

    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/home" />}

                    />

                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/trades"
                        element={<Trades />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/psychology"
                        element={<Psychology />}
                    />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                    <Route
                        path="/portfolio"
                        element={<Portfolio />}
                    />

                    <Route
                        path="/mt5"
                        element={<MT5 />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />
                    <Route
                        path="/trading-plan"
                        element={<TradingPlan />}
                    />

                </Routes>
            </MainLayout>
        </BrowserRouter>
    );

}

export default App;