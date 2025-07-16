import logoSvg from "../assets/logo.svg";
import logoutSvg from "../assets/logout.svg";

import { useAuth } from "../hooks/useAuth";

export function Header() {
    const auth = useAuth();

    return (
        <header className="w-full flex justify-between my-8">
            <img src={logoSvg} alt="Logo" />
            <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-200">
                    Olá, {auth.session?.user.name}
                </span>
                <img
                    src={logoutSvg}
                    alt="Ícone de Saír"
                    className="my-8 cursor-pointer hover:opacity-85 transition ease-linear"
                    onClick={() => auth.remove()}
                />
            </div>
        </header>
    );
}
