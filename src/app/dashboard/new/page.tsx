import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from '@/lib/prisma'

export default async function NewTicket() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

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
                    <input className="w-full border-2 rounded-md px-2 mb-2 h-11" type="text" required placeholder="Digite o nome do chamado..." />
                    <label className="mb-1 font-medium text-lg" htmlFor="">Descreva o problema</label>
                    <textarea className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" required placeholder="Descreva o problema...">
                    </textarea>
                    {customers.length != 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg" htmlFor="">Selecione o cliente</label>
                            <select className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white" name="" id="">
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                    {customers.length === 0 && (
                        <Link href={"/dashboard/customer/new"}> px-2
                            Ainda não possui cliente, <span>cadastre um cliente</span>
                        </Link>
                    )}

                    <button disabled={customers.length === 0 ? true : false} type="submit" 
                    className="bg-blue-500 text-white font-bold px-2 h-11 rounded cursor-pointer my-4 disabled:cursor-not-allowed disabled:bg-gray-400">
                        Cadastrar
                    </button>
                </form>
            </main>
        </Container>
    )
}