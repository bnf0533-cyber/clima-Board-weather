import "../css/dashboard.css";
import { useState, useEffect } from "react";
import { useExplorerStore } from "../store/useExplorerStore";
import { getCurrentWeather } from "../services/api";
import type { CurrentWeather } from "../types/weatherTypes";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [loading, setLoading] = useState(true);
    const { explorerName } = useExplorerStore();
    const navigate = useNavigate();

    useEffect(() => {
        const loadWeather = async () => {
            try {
                setLoading(true);
                const data = await getCurrentWeather(31.7683, 35.2137);
                setWeather(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadWeather();
    }, []);
    return (
        <div>
            {loading ? (
                <p>Loading weather details...</p>
            ) : weather ? (
                <div className="weather-card">
                    <h3>hey {explorerName}</h3>
                    <p>Temperature {weather.temperature_2m}</p>
                    <p>Actual feeling {weather.apparent_temperature}</p>
                    <p>wind {weather.wind_speed_10m}</p>
                </div>
            ) : (
                <p>Felid to load weather details</p>
            )}

            <div className="quick-action">
                <button onClick={() => navigate("/app/search")}>Search</button>
                <button onClick={() => navigate("/app/favorites")}>
                    My Favorite
                </button>
                <button onClick={() => navigate("/app/compare")}>
                    Compare Cities
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;
