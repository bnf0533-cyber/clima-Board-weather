import { Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import WelcomePage from "./pages/WelcomePage";
import CityDetailsPage from "./pages/CityDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
import ProtectedRoute from "./components/ProtectedeRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<DashboardPage />} />
                <Route path="/app/search" element={<SearchPage />} />
                <Route
                    path="/app/city/:cityName"
                    element={<CityDetailsPage />}
                />
                <Route path="/app/favorites" element={<FavoritesPage />} />
                <Route path="/app/compare" element={<ComparePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
