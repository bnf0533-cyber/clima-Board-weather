import "../css/favorites.css";
import { useEffect, useState } from "react";
import { deleteFavorites, getFavorites } from "../services/api";
import { useExplorerStore } from "../store/useExplorerStore";
import type { FavoriteItem } from "../types/weatherTypes";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
    const navigate = useNavigate();
    const { explorerName } = useExplorerStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [getFav, setGetFav] = useState<FavoriteItem[] | null>([]);
    useEffect(() => {
        const getFavoriteData = async () => {
            try {
                setLoading(true);
                const favorite = await getFavorites(explorerName);
                setGetFav(favorite);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError("failed to load favorite cities");
            } finally {
                setLoading(false);
            }
        };
        getFavoriteData();
    }, [explorerName]);
    const handleDelete = async (id: number) => {
        try {
            await deleteFavorites(id);
            setGetFav((prev) =>
                prev ? prev.filter((item) => item.id !== id) : []
            );
        } catch (error) {
            console.error(error);
            setError("City not found");
        }
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {getFav?.length === 0 && (
                <p className="empty-favorite">Not Yet Favorites Cities Now</p>
            )}
            <div>
                {getFav?.map((fav) => (
                    <div key={fav.id} className="favorite-item">
                        <p>{fav.city_name}</p>
                        <button
                            className="btn-fav-go-city"
                            onClick={() =>
                                navigate(
                                    `/app/city/${fav.city_name}?lat=${fav.lat}&lon=${fav.lon}`
                                )
                            }
                        >
                            View
                        </button>
                        <button
                            className="btn-remove-fav"
                            onClick={() => handleDelete(fav.id)}
                        >
                            Delete From Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;
