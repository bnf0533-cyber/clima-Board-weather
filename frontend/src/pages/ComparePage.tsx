import "../css/compare.css";
import { useEffect, useRef, useState } from "react";
import { compareWeather, searchCities } from "../services/api";
import type { WeatherComparison } from "../types/weatherTypes";

function ComparePage() {
    const [city1Name, setCity1Name] = useState("");
    const [city2Name, setCity2Name] = useState("");
    const [comparison, setComparison] = useState<WeatherComparison | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCompare = async () => {
        if (city1Name.trim().length < 2 || city2Name.trim().length < 2) {
            setError("please enter two valid city names");
            return;
        }
        try {
            setError("");
            setLoading(true);
            setComparison(null)
            const res1 = await searchCities(city1Name);
            if (!res1 || res1.length === 0) {
                setError(`city ${city1Name} not found`);
                return;
            }
            const res2 = await searchCities(city2Name);

            if (!res2 || res2.length === 0) {
                setError(`city ${city2Name} not found`);
                return;
            }
            const data = await compareWeather(
                res1[0].latitude,
                res1[0].longitude,
                res2[0].latitude,
                res2[0].longitude
            );
            setComparison(data);
        } catch (error) {
            console.error(error);
            setError("failed to get cities");
        } finally {
            setLoading(false);
        }
    };
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus();
    },[])
    return (
        <div className="compare-page">
            <h2>Compare Weather</h2>
            <div className="compare-inputs">
                <input
                    type="text"
                    placeholder="Please enter first city..."
                    value={city1Name}
                    onChange={(e) => setCity1Name(e.target.value)}
                    ref={inputRef}
                />
                <span> VS </span>
                <input
                    type="text"
                    placeholder="Please enter second city..."
                    value={city2Name}
                    onChange={(e) => setCity2Name(e.target.value)}
                />
                <button onClick={handleCompare} disabled={loading} >
                    {loading ? "Compare..." : "compare"}
                </button>
            </div>
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {comparison && (
                <div className="comparesResult">
                    <div className="compare-card">
                        <h3>{city1Name}</h3>
                        <p>Temperature: {comparison.city1.temperature_2m}</p>
                        <p>
                            Feels like: {comparison.city1.apparent_temperature}
                        </p>
                        <p>Wind: {comparison.city1.wind_speed_10m}</p>
                    </div>
                    <div className="compare-card">
                        <h3>{city2Name}</h3>
                        <p>Temperature: {comparison.city2.temperature_2m}</p>
                        <p>
                            Feels like: {comparison.city2.apparent_temperature}
                        </p>
                        <p>Wind: {comparison.city2.wind_speed_10m}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ComparePage;
