import "../css/search.css";
import { useEffect, useRef, useState } from "react";
import { searchCities } from "../services/api";
import type { City } from "../types/weatherTypes";
import { useNavigate } from "react-router-dom";

function SearchPage() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [res, setRes] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
    inputRef.current?.focus();
}, []);
    const handleSearch = async () => {
        if (query.trim().length < 2) {
            setError("Please enter at least 2 characters");
            return;
        }
        try {
            setError("");
            setLoading(true);
            const data = await searchCities(query);
            setRes(data);
            setLoading(false);
        } catch (error) {
            setError("failed to load cities please try again");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="div-search-page">
            <h2>Search City</h2>
            <div className="search-box">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    ref={inputRef}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    
                    onClick={handleSearch}
                    disabled={loading}
                    
                >
                    Search
                </button>
            </div>
            {error && <p>{error}</p>}
            {loading && <p>Searching cities...</p>}
            <div className="results-list-search">
                {res.map((city) => (
                    <div key={city.id} className="city-item">
                        <h4>{city.name}</h4>
                        <p>
                            {city.admin1}
                            {city.admin1 && `${city.admin1}`}
                        </p>
                        <button
                            onClick={() =>
                                navigate(
                                    `/app/city/${city.name}?lat=${city.latitude}&lon=${city.longitude}`
                                )
                            }
                        >
                            View weather
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
