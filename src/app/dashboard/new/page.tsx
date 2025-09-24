import { Container } from "@/components/container";
import Link from "next/link";

export default function NewTicket() {
    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link className="text-white px-4 py-1 rounded bg-gray-900" href={"/dashboard"}>
                        Voltar
                    </Link>
                <h1 className="text-3xl font-bold">Novo chamado</h1>
                </div>
                <form className="flex flex-col mt-6">
                    <label className="mb-1 font-medium text-lg" htmlFor="">Nome do chamado</label>
                    <input className="w-full border-2 rounded-md px-2 mb-2 h-11" type="text" required placeholder="Digite o nome do chamado..."/>
                    <label className="mb-1 font-medium text-lg" htmlFor="">Descreva o problema</label>
                    <textarea className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" required placeholder="Descreva o problema...">
                    </textarea>
                    <label className="mb-1 font-medium text-lg" htmlFor="">Selecione o cliente</label>
                    <select className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white" name="" id="">
                        <option value="cliente 1">Cliente 1</option>
                    </select>
                </form>
            </main>
        </Container>
    )
}