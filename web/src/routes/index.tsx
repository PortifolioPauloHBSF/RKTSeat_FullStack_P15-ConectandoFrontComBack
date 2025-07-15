import { BrowserRouter } from "react-router";
import { Loading } from "../components/Loading";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { useAuth } from "../hooks/useAuth";

const isLoading = false;
// const session = undefined;
const session = {
    user: {
        role: "",
    },
};

export function Routes() {
    const context = useAuth()

    function MyRoute() {
        switch (session?.user.role) {
            case "employee":
                return <EmployeeRoutes />;

            case "manager":
                return <ManagerRoutes />;

            default:
                return <AuthRoutes />;
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <MyRoute />
        </BrowserRouter>
    );
}
