from fastapi import APIRouter
from app.services.weather_service import search_city

router = APIRouter(prefix="/cities",tags=["cites"])

@router.get("/search")
def search_city_router(name : str):
    return search_city(name)