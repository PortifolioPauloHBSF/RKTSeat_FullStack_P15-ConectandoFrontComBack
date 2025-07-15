import { Routes } from "./routes";
import { AuthContext } from "./contexts/AuthContext";

export function App() {
    return (
        <AuthContext.Provider value={{ name: "Paulo" }}>
            <Routes />
        </AuthContext.Provider>
    );
}
