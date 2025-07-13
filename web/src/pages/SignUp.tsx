import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";

import { z } from "zod";
import { ZodError } from "zod";

import { api } from "../services/api";
import { AxiosError } from "axios";

const signUpSchema = z
    .object({
        name: z.string().trim().min(1, { message: "Informe um Nome" }),
        email: z.string().email({ message: "e-mail inválido" }),
        password: z.string().min(6, { message: "A senha deve conter pelo menos 6 dígitos" }),
        passwordConfirm: z.string({ message: "Confirme a Senha" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Ase senhãs não conferem",
        path: ["passwordConfirm"],
    });

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true);
            const signUpData = signUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm
            });
            
            await api.post("/users", signUpData)

            if (confirm("Cadastrado com Sucesso. Ir para tela inicial?")) {
                navigate("/")
            }

        } catch (error) {
            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }
            alert("Não foi possível cadastrar.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input
                legend="Nome"
                placeholder="Fulano de Tal"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                legend="Senha"
                type="password"
                placeholder="senha"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Input
                legend="Confirme sua Senha"
                type="password"
                placeholder="senha"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
            />
            <Button isLoading={isLoading} type="submit">
                Cadastrar
            </Button>
            <a
                href="/"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
            >
                Já tenho uma conta
            </a>
        </form>
    );
}
