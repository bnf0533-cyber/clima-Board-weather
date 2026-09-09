from fastapi import APIRouter
from app.services.favorites import get_favorites_by_name, add_favorites, delete_favorites

from app.schema.favorites_schema import FavoritesSchema
router = APIRouter(prefix="/favorites", tags=["favorites"])

@router.get("/get/{name}")
def get_favorites_by_name_router(name : str):
    return get_favorites_by_name(name)

@router.post("/add")
def add_favorites_router(fav : FavoritesSchema):
    return add_favorites(fav.explorer_name, fav.city_name, fav.lat, fav.lon)

@router.delete("/remove/{id}")
def delete_favorites_router(id : int):
    return delete_favorites(id)