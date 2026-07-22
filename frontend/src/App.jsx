import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation
} from "react-router-dom";

import {
    lazy,
    Suspense
} from "react";

import MainLayout from "./layouts/MainLayout";
import { WidgetLoading } from "./components/widgets";
import { isAuthenticated } from "./services/authService";

const Login = lazy(() => import("./pages/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
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

function ProtectedRoute({ children }) {
    const location = useLocation();

    if (!isAuthenticated()) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}

function PublicOnlyRoute({ children }) {
    if (isAuthenticated()) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

function ProtectedLayout() {
    return (
        <ProtectedRoute>
            <MainLayout>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/home" replace />}
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

                    <Route
                        path="*"
                        element={<Navigate to="/home" replace />}
                    />
                </Routes>
            </MainLayout>
        </ProtectedRoute>
    );
}

function AppRoutes() {
    return (
        <Suspense fallback={<WidgetLoading />}>
            <Routes>
                <Route
                    path="/login"
                    element={
                        <PublicOnlyRoute>
                            <Login />
                        </PublicOnlyRoute>
                    }
                />

                <Route
                    path="/reset-password"
                    element={<ResetPassword />}
                />

                <Route
                    path="/*"
                    element={<ProtectedLayout />}
                />
            </Routes>
        </Suspense>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;