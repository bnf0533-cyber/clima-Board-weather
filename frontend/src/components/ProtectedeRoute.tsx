import "../css/layout.css";
import { Navigate, Outlet } from "react-router-dom";
import { useExplorerStore } from "../store/useExplorerStore";
import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

function ProtectedRoute() {
    const { explorerName } = useExplorerStore();
    if (!explorerName || explorerName.trim() === "") {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default ProtectedRoute;
