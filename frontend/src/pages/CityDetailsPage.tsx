import "../css/cityDetails.css";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { CurrentWeather, DailyForecast } from "../types/weatherTypes";
import { getCurrentWeather, getForecast } from "../services/api";
import { useExplorerStore } from "../store/useExplorerStore";
import { addFavorites } from "../services/api";

function CityDetailsPage() {
    const { cityName } = useParams();
    const [searchParams] = useSearchParams();
    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [forecast, setForecast] = useState<DailyForecast | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const current = await getCurrentWeather(lat, lon);
                const daily = await getForecast(lat, lon, 5);
                setWeather(current);
                setForecast(daily);
            } catch (error) {
                console.error(error);
                setError("failed to loading details");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [lat, lon]);
    const {explorerName} = useExplorerStore();
    const [ fav , setFav] = useState("")
    const handleAddFavorite = async () => {
        if (!cityName) return;
        try {
            await addFavorites(explorerName,cityName , lat , lon );
            setFav('added to favorite')
        } catch (error) {
            console.error(error);
            setFav("failed to add to favorite")
        }
    }
    return (
        <div className="city-details-page">
            <div className="city-header">
                <h2 className="city-title">{cityName}</h2>
            </div>
            <div className="current-weather-card">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {forecast &&
                    forecast.time.map((data, index) => (
                        <div key={data} className="forecast-card">
                            <p className="forecast-temp">
                                max : {forecast.temperature_2m_max[index]}
                            </p>
                            <p className="forecast-temp">
                                min : {forecast.temperature_2m_min[index]}
                            </p>
                        </div>
                    ))}
                <div>
                    <button className="btn-favorite" onClick={handleAddFavorite}>Add to favorite</button>
                    {fav && <p>{fav}</p>}
                </div>
                <h3>Current Weather</h3>
                <p>Temperature: {weather?.temperature_2m}</p>
                <p>Feels like {weather?.apparent_temperature}</p>
                <p>Wind {weather?.wind_speed_10m}</p>
            </div>
        </div>
    );
}

export default CityDetailsPage;
