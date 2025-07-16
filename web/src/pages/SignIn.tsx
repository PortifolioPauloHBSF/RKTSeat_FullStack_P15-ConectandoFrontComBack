import { useActionState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
    email: z.string().email({ message: "Informe um email válido" }),
    password: z.string(),
});

export function SignIn() {
    const auth = useAuth()
    
    const [state, formAction, isPending] = useActionState(signIn, {
        email: "",
        password: "",
    });

    async function signIn(_: any, formData: FormData) {
        try {
            const data = signInSchema.parse({
                email: formData.get("email"),
                password: formData.get("password"),
            });
            const response = await api.post("/sessions", data);
            auth.save(response.data) // Salvando resposta no estado 
        } catch (error) {
            if (error instanceof ZodError) {
                return { email: formData.get("email"), message: error.issues[0]?.message };
            }
            if (error instanceof AxiosError) {
                return { message: error.response?.data.message };
            }
            return { email: formData.get("email"), message: "Não foi possível entrar" };
        }
    }

    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input
                name="email"
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                defaultValue={String(state?.email)}
                required
            />
            <Input name="password" legend="Senha" type="password" placeholder="senha" required />
                <p className="text-sm text-red-600 text-center my-4 font-medium">
                    {state?.message}
                </p>
            <Button isLoading={isPending} type="submit">
                Entrar
            </Button>
            <a
                href="/signup"
                className="text-sm font-semibold text-gray-100 mt-4 sm:mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
            >
                Criar conta
            </a>
        </form>
    );
}
