import { Link, useNavigate } from "react-router-dom";
import { useExplorerStore } from "../store/useExplorerStore";

export function Navbar() {
    const { explorerName, logout } = useExplorerStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/app">ClimaBoard</Link>
            </div>
            <div className="nav-links">
                <Link to="/app">Dashboard</Link>
                <Link to="/app/search">Search</Link>
                <Link to="/app/favorites">Favorites</Link>
                <Link to="/app/compare">Compare</Link>
            </div>
            <div className="nav-user">
                <span className="user-greeting">{explorerName}</span>
                <button className="btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}