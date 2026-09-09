export type City = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
};

export type CurrentWeather = {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    weather_code: number;
};

export type DailyForecast = {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
};

export type FavoriteItem = {
    id: number;
    explorer_name: string;
    city_name: string;
    lat: number;
    lon: number;
};

export type WeatherComparison = {
    city1: CurrentWeather;
    city2: CurrentWeather;
};
