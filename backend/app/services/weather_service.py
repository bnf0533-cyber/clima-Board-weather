import requests
from fastapi import HTTPException

def search_city(city_name : str):
    if len(city_name.strip()) < 2 or len(city_name) > 50:
        raise HTTPException(400,"your name is invalid")

    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {
        "name" : city_name
    }
    res = requests.get(url, params=params)
    data = res.json()
    return data.get("results", [])

def get_weather(lat: float, lon: float):
    if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
        raise HTTPException(400,"bad request, coordination out of the range")
    forecast_url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,apparent_temperature,wind_speed_10m,weather_code"
    }
    res = requests.get(forecast_url, params=params)
    data = res.json()
    return data.get("current", {})

def get_forecast(lat : float , lon : float, day : int = 5):
    if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
        raise HTTPException(400,"bad request, coordination out of the range")
    if day < 1 or day > 16:
        raise HTTPException(400,"the number of day must be between 1-16")
    forecast_url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude" : lat,
        "longitude" :lon,
        "forecast_days" : day,
        "daily" : "temperature_2m_max,temperature_2m_min,weather_code"
    }
    res = requests.get(forecast_url, params=params)
    data = res.json()
    return data.get("daily", {})

def compare_weather(lat1 : float , lon1 : float , lat2 : float , lon2 : float):
    if not (-90 <= lat1 <= 90) or not (-180 <= lon1 <= 180) or not (-90 <= lat2 <= 90) or not (-180 <= lon2 <= 180):
        raise HTTPException(400,"bad request, coordination out of the range")
    city1 = get_weather(lat1 , lon1)
    city2 = get_weather(lat2 , lon2)
    return {
        "city1" : city1,
        "city2" : city2
    }


