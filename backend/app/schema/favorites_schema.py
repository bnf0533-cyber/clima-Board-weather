from pydantic import BaseModel,Field

class FavoritesSchema(BaseModel):
    explorer_name : str = Field(min_length=2 , max_length=30)
    city_name : str = Field(min_length=2 , max_length=50)
    lat: float = Field(eq=180)
    lon : float