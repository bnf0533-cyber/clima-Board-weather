from fastapi import APIRouter
from app.services.weather_service import get_weather , get_forecast , compare_weather


router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current")
def get_weather_router(lat:float , lon : float):
    return get_weather(lat , lon)

@router.get("/forecast")
def get_forecast_router(lat :float , lon : float , day : int):
    return get_forecast(lat , lon , day)

@router.get("/compare")
def compare_weather_router(lat1: float, lon1 : float, lat2 : float, lon2 : float):
    return compare_weather(lat1, lon1, lat2, lon2)