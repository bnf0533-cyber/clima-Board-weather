import "../css/welcome.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExplorerStore } from "../store/useExplorerStore";

function WelcomePage() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setExplorerName } = useExplorerStore();
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const handleEnter = () => {
        if (name.trim().length < 2) {
            setError("Name must be 2+ chares");
            return;
        }
        setExplorerName(name.trim());
        navigate("/app");
    };
    return (
        <div className="div-welcome-page">
            <div className="div-title-welcome">
                <h2 className="title-welcome-page">
                    Welcome To ClimaBoard Enjoy where you here
                </h2>
            </div>
            <div className="div-input-welcome">
                <input
                    type="text"
                    className="input-welcome-name"
                    placeholder="please enter your name..."
                    value={name}
                    ref={inputRef}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleEnter()}
                />
                {error && <p>{error}</p>}
            </div>
            <div className="div-btn-welcome">
                <button className="btn-welcome" onClick={handleEnter}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;
