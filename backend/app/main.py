import uvicorn
import time
from fastapi import FastAPI , Request
from app.middleware.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from app.routes.cities import router as cities_router
from app.routes.weather import router as weather_router
from app.routes.favorites import router as favorites_router
from app.routes.atbash import router as atbash_router

app = FastAPI(title = "ClimaBoard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.middleware("http")
async def log_request_middleware(request : Request , call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"[{request.method}] {request.url.path} - Status : {response.status_code} - Took: {duration:.4f}s")
    return response

app.include_router(cities_router)
app.include_router(weather_router)
app.include_router(favorites_router)
app.include_router(atbash_router)

@app.get("/health")
def health_check():
    return {"status" : "ok", "message" : "ClimaBoard backend is valid"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1",port=8000,reload=True)