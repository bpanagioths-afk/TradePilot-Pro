import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import {
    lazy,
    Suspense
} from "react";

import MainLayout from "./layouts/MainLayout";
import { WidgetLoading } from "./components/widgets";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const Trades = lazy(() => import("./pages/Trades"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Psychology = lazy(() => import("./pages/Psychology"));
const Reports = lazy(() => import("./pages/Reports"));
const MT5 = lazy(() => import("./pages/MT5"));
const Settings = lazy(() => import("./pages/Settings"));
const TradingPlan = lazy(() => import("./pages/TradingPlan"));
const Portfolio = lazy(() => import("./pages/Portfolio"));

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Suspense fallback={<WidgetLoading />}>
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
                </Suspense>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;