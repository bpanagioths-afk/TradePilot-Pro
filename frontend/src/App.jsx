import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";
import Psychology from "./pages/Psychology";
import Reports from "./pages/Reports";
import MT5 from "./pages/MT5";
import Settings from "./pages/Settings";

function App() {

    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" />}
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
                        path="/mt5"
                        element={<MT5 />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );

}

export default App;