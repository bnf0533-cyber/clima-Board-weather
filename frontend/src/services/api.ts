import axios from "axios";
import type {
    City,
    CurrentWeather,
    DailyForecast,
    FavoriteItem,
    WeatherComparison,
} from "../types/weatherTypes";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

export const searchCities = async (name: string) => {
    const res = await api.get<City[]>("/cities/search", {
        params: { name },
    });
    return res.data;
};

export const getCurrentWeather = async (lat: number, lon: number) => {
    const res = await api.get<CurrentWeather>("/weather/current", {
        params: { lat, lon },
    });
    return res.data;
};

export const getForecast = async (
    lat: number,
    lon: number,
    day: number = 5
) => {
    const res = await api.get<DailyForecast>("/weather/forecast", {
        params: { lat, lon, day },
    });
    return res.data;
};

export const compareWeather = async (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) => {
    const res = await api.get<WeatherComparison>("/weather/compare", {
        params: { lon1, lat1, lon2, lat2 },
    });
    return res.data;
};

export const getFavorites = async (explorer_name: string) => {
    const res = await api.get<FavoriteItem[]>(
        `/favorites/get/${explorer_name}`
    );
    return res.data;
};

export const addFavorites = async (
    explorer_name: string,
    city_name: string,
    lat: number,
    lon: number
) => {
    const res = await api.post<FavoriteItem>("/favorites/add", {
        explorer_name,
        city_name,
        lat,
        lon,
    });
    return res.data;
};

export const deleteFavorites = async (id: number) => {
    const res = await api.delete<FavoriteItem>(`/favorites/remove/${id}`);
    return res.data;
};
