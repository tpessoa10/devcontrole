import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCostumerForm } from "../components/form";

export default async function NewCostumer() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link className="bg-gray-900 px-4 py-1 text-white rounded" href={"/dashboard/customer"}>
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">
                        Novo cliente
                    </h1>
                </div>
                <NewCostumerForm userId={session.user.id}/>
            </main>
        </Container>
    )
}