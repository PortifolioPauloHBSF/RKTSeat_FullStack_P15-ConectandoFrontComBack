import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";

import fileSvg from "../assets/file.svg";

const refundSchema = z.object({
    name: z.string().trim().min(3, { message: "Informe um Nome Claro para sua Solicitação" }),
    category: z.string().min(1, { message: "Informe a Categoria" }),
    amount: z.coerce
        .number({ message: "Informe um valor válido" })
        .positive({ message: "Informe um valor válido e positivo." }),
});

export function Refund() {
    const [name, setName] = useState("");
    const [amount, setAmout] = useState("");
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [filename, setFilename] = useState<File | null>(null);

    const navigate = useNavigate();
    const param = useParams<{ id: string }>();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (param.id) {
            return navigate(-1);
        }

        try {
            setIsLoading(true);
            const data = refundSchema.parse({
                name,
                category,
                amount: amount.replace(",", "."),
            });

            await api.post("/refunds", {
                ...data,
                filename: "12345678910111213141516171819.png",
            });

            navigate("/confirm", { state: { fromSubmit: true } });
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message);
            }

            alert("Não foi possível realizar a solicitação.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
        >
            <header>
                <h1 className="text-xl font-bold text-gray-100">Solicitação de Reembolso</h1>
                <p className="text-sm text-gray-200 mt-2 mb-4">
                    Dados da despesa para solicitar reembolso.
                </p>
            </header>

            <Input
                required
                legend="Nome da Slicitação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!param.id}
            />

            <div className="flex gap-4">
                <Select
                    required
                    legend="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-2"
                    disabled={!!param.id}
                >
                    {CATEGORIES_KEYS.map((category) => (
                        <option key={category} value={category}>
                            {CATEGORIES[category].name}
                        </option>
                    ))}
                </Select>

                <Input
                    value={amount}
                    onChange={(e) => setAmout(e.target.value)}
                    required
                    legend="Valor"
                    className="flex-1"
                    disabled={!!param.id}
                />
            </div>

            {param.id ? (
                <a
                    href="http://google.com"
                    target="_blank"
                    className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-80 transition ease-linear"
                >
                    <img src={fileSvg} alt="Ícone de Baixar Arquivo" />
                    Abrir comprovante
                </a>
            ) : (
                <Upload
                    filename={filename && filename.name}
                    onChange={(e) => e.target.files && setFilename(e.target.files[0])}
                />
            )}

            <Button type="submit" isLoading={isLoading}>
                {param.id ? "Voltar" : "Enviar"}
            </Button>
        </form>
    );
}
