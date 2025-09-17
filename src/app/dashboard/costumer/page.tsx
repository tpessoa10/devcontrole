import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";

export default async function Costumer(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
            redirect("/")
        }


    return(
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link href={"/dashboard/costumer/new"} className="bg-blue-500 text-white px-4 py-1 rounded">
                        Novo cliente
                    </Link>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                    <CardCustomer/>
                    <CardCustomer/>
                    <CardCustomer/>
                </section>
            </main>
        </Container>
    )
}