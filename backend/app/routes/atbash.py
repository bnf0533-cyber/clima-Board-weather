from fastapi import APIRouter
from app.services.atbash_service import atbash

router = APIRouter(prefix="/atbash" , tags=["atbash"])

@router.get("/{text}")
def atbash_router(text : str):
    return atbash(text)