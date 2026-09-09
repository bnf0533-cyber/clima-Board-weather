from fastapi import HTTPException
favorites_db = []
next_id = 1

def get_favorites_by_name(explorer_name : str):
    user_favorites = []
    for item in favorites_db:
        if item["explorer_name"] == explorer_name:
            user_favorites.append(item)
    return user_favorites

def add_favorites(explorer_name: str , city_name : str , lat : float  , lon : float):
    if len(explorer_name.strip()) < 2:
        raise HTTPException(400 , "explorer name must be 2 char +")
    global next_id
    new_fav = {
        "id" : next_id,
        "explorer_name" : explorer_name,
        "city_name" : city_name,
        "lat" : lat,
        "lon" : lon
    }
    next_id += 1
    favorites_db.append(new_fav)
    return new_fav

def delete_favorites(favorite_id : int):
    for item in favorites_db:
        if item["id"] == favorite_id:
            favorites_db.remove(item)
            return {"message" : "favorites deleted successfully"}
    raise HTTPException(status_code=404, detail="Favorite not found")

